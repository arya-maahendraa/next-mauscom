import fs from 'fs';
import path from 'path';

const stopWordsPath = path.join(__dirname, '..', 'assets/data/id.stopwords.02.01.2016.txt');
const slangWordsPath = path.join(__dirname, '..', 'assets/data/colloquial-indonesian-lexicon.csv');
const fileModelPath = path.join(__dirname, '..', 'assets/data/trained_model.json');

const stopWords = fs.readFileSync(stopWordsPath).toString('utf-8').split('\n');
const naiveBayesModel: NaiveBayesModel = JSON.parse(fs.readFileSync(fileModelPath).toString('utf-8'));
const slanglWords = fs
   .readFileSync(slangWordsPath)
   .toString('utf-8')
   .split('\r\n')
   .map(term => {
      const newTerm = term.split(';').map(e => e.trim());
      return {
         slang: newTerm[0],
         formal: newTerm[1],
      };
   });

export { stopWords, slanglWords, naiveBayesModel };
