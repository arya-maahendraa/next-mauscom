import { Service, Inject } from 'typedi';
import { Logger } from 'winston';
// import { slanglWords, stopWords } from '../loaders/dataLoader';
import _ from 'underscore';
import fs from 'fs';
import path from 'path';

@Service()
export default class NiaveBayes {
   constructor(@Inject('logger') private logger: Logger) {}
   /**
    * predic sentiment of a new term.
    * @param newTerms - new term
    * @param model - trained naive bayes model for sentiment analysis.
    * @param alpha - smoothing value (1 ~ laplace smoothing | < 1 ~ lidstone smoothing).
    * @returns sentiment for the new term (1 ~ positive | -1 ~ negative).
    */
   public predic(newTerms: Array<string>, model: NaiveBayesModel, alpha: number): number {
      // Class-conditional Probabilities for Class Positive
      const ccpPositiveTerms = this.calcCCP(newTerms, model.terms.positive, model.sumAllTFIDFPositive, model.v, alpha);
      // Class-conditional Probabilities for Class Negative
      const ccpNegativeTerms = this.calcCCP(newTerms, model.terms.negative, model.sumAllTFIDFNegative, model.v, alpha);
      const ccpPositive = ccpPositiveTerms.reduce((accumulator, currentValue) => accumulator * currentValue);
      const ccpNegative = ccpNegativeTerms.reduce((accumulator, currentValue) => accumulator * currentValue);
      const classPositive = ccpPositive * model.pbClassPositive;
      const classNegative = ccpNegative * model.pbClassNegative;
      if (classPositive > classNegative) {
         return 1;
      }
      if (classNegative > classPositive) {
         return -1;
      }
      return 0;
   }
   public testing(test: TestData, model: NaiveBayesModel, alpha: number): ConfusionMatrix {
      const cm: ConfusionMatrix = {
         TP: 0,
         TN: 0,
         FP: 0,
         FN: 0,
         accuracy: 0,
         percision: 0,
         recall: 0,
      };
      for (let i = 0; i < test.positive.length; i++) {
         this.predic(test.positive[i], model, alpha) === 1 ? cm.TP++ : cm.FN++;
      }
      for (let i = 0; i < test.negative.length; i++) {
         this.predic(test.negative[i], model, alpha) === -1 ? cm.TN++ : cm.FP++;
      }
      cm.accuracy = (cm.TP + cm.TN) / (cm.TP + cm.TN + cm.FP + cm.FN);
      cm.percision = cm.TP / (cm.TP + cm.FP);
      cm.recall = cm.TP / (cm.TP + cm.FN);
      this.logger.info(`TP: ${cm.TP} | TN: ${cm.TN} | FP: ${cm.FP} | FN: ${cm.FN}`);
      return cm;
   }
   /**
    * training naive bayes to do sentiment analysis.
    * clasified text to class postive or negative.
    * @param train - data training
    * @param testing - data testing
    */
   public fit(train: TrainData, test: TestData): void {
      //prior probability of class prositive.
      const pbClassPositive = train.positive.length / (train.positive.length + train.negative.length);
      //prior probabilityevidence of class negative.
      const pbClassNegative = train.positive.length / (train.positive.length + train.negative.length);
      const { uniqueTerms: positiveUniqueTerms, sumAllTFIDF: sumAllTFIDFPositive } = this.prosesData(train.positive);
      this.logger.debug(`Positive unique terms ${positiveUniqueTerms.length}`);
      const { uniqueTerms: negativeUniqueTerms, sumAllTFIDF: sumAllTFIDFNegative } = this.prosesData(train.negative);
      this.logger.debug(`Negative unique terms ${negativeUniqueTerms.length}`);
      //The size of the vocabulary (number of different words in the training set).
      const v = this.getUniqueTerms(train.positive.concat(train.negative)).length;
      // this.logger.info(`Total Atribut: ${positiveUniqueTerms.length + negativeUniqueTerms.length}`);
      const model: NaiveBayesModel = {
         terms: {
            positive: positiveUniqueTerms,
            negative: negativeUniqueTerms,
         },
         pbClassPositive,
         pbClassNegative,
         sumAllTFIDFNegative,
         sumAllTFIDFPositive,
         v,
      };
      console.time('testing');
      const confusionMatrix = this.testing(test, model, 1);
      this.logger.info(
         `Accuracy ${(confusionMatrix.accuracy * 100).toFixed(2)}% | Percision: ${(
            confusionMatrix.percision * 100
         ).toFixed(2)}% | Recall: ${(confusionMatrix.recall * 100).toFixed(2)}%`
      );
      console.timeEnd('testing');
      this.saveModelJSON(model);
   }
   /**
    * extract unique terms in all documents.
    * @param {2d array of string} arr - array to extract uniq vlaue form.
    * @returns array of unique terms
    */
   private getUniqueTerms(arr: Array2DString): Array<string> {
      const newArr = _.flatten(arr); // transfor array to 1D array of string.
      return _.uniq(newArr); // get all anique value in all array.
   }
   /**
    * coun number of documents that contain the term t.
    * @param {string} term - word or term to search in collection of documnets.
    * @param {Array2DString} arr - collection of documetns.
    * @returns The number of documents that contain the term t.
    */
   private countNdt(term: string, arr: Array2DString): number {
      let count = 0;
      for (let i = 0; i < arr.length; i++) {
         if (arr[i].indexOf(term) !== -1) {
            count++;
         }
      }
      return count;
   }
   /**
    * extract unique terms in all documents.
    * calc tf-idf and ndt for each terms.
    * ndt: The number of documents that contain the term t.
    * @param {2d array of string} arr - array to extract uniq vlaue form.
    * @returns array of {terms, ndt, tfidf}
    */
   private prosesData(arr: Array2DString): {
      uniqueTerms: Array<{ term: string; tfidf: number }>;
      sumAllTFIDF: number;
   } {
      let sumAllTFIDF = 0;
      const uniqueTerms = this.getUniqueTerms(arr).map(term => {
         const ndt = this.countNdt(term, arr); //The number of documents that contain the term t.
         const tfidf = this.sumTFIDF(term, ndt, arr);
         sumAllTFIDF += tfidf;
         return {
            term: term,
            tfidf: tfidf,
         };
      });
      return {
         uniqueTerms: uniqueTerms,
         sumAllTFIDF: sumAllTFIDF,
      };
   }
   /**
    * sum all tf-idf of a term from collection of documents.
    * @param term - he term to find or calc sum of tf-idf from collection of documents.
    * @param ndt - The number of documents that contain the term t.
    * @param arr - collection of documents
    * @returns sum of tf-idf from collection of documents
    */
   private sumTFIDF(term: string, ndt: number, arr: Array2DString): number {
      let currTFIDF = 0;
      for (let i = 0; i < arr.length; i++) {
         currTFIDF += this.calcTFIDF(term, arr.length, ndt, arr[i]);
      }
      return currTFIDF;
   }
   /**
    * find or calculate tf-idf of a term in a document.
    * @param {string} term - the term to find or calc tf-idf in a document.
    * @param {number} nd - the total number of documents.
    * @param {number} ndt - the number of documents that contain the term t.
    * @param {Array<string>} terms - the Document term t to be find or calc.
    * @returns tf-idf of  term.
    */
   private calcTFIDF(term: string, nd: number, ndt: number, terms: Array<string>): number {
      const rawTF = terms.filter(e => e === term).length; //Raw term frequency (the count of term t in document d).
      const nt = terms.length; //The total number of terms in document d.
      const tf = rawTF / nt; //term frequecy
      const idf = Math.log2(nd / ndt); //document inverse frequecy
      return tf * idf; //tf-idf
   }
   private calcCCP(
      newTerms: Array<string>,
      modelTerms: Array<{ term: string; tfidf: number }>,
      sumAllTFIDF: number,
      v: number,
      alpha: number
   ): Array<number> {
      const ccp: Array<number> = []; //class-conditional probabilities
      for (let i = 0; i < newTerms.length; i++) {
         const tfidf = _.find(modelTerms, e => e.term === newTerms[i])?.tfidf || 0;
         const a = tfidf + alpha;
         const b = sumAllTFIDF + alpha * v;
         ccp.push(a / b);
      }
      return ccp;
   }
   private saveModelJSON(model: NaiveBayesModel): void {
      const filePath = path.join(__dirname, '..', 'assets/data/trained_model.json');
      fs.writeFile(filePath, JSON.stringify(model), { encoding: 'utf-8' }, err => {
         if (err) {
            this.logger.error('Failed write model to JSON');
            throw err;
         }
         this.logger.info('model saved to JSON file.');
      });
   }
}
