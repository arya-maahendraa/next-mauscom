"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
// import { slanglWords, stopWords } from '../loaders/dataLoader';
var underscore_1 = __importDefault(require("underscore"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var NiaveBayes = /** @class */ (function () {
    function NiaveBayes(logger) {
        this.logger = logger;
    }
    /**
     * predic sentiment of a new term.
     * @param newTerms - new term
     * @param model - trained naive bayes model for sentiment analysis.
     * @param alpha - smoothing value (1 ~ laplace smoothing | < 1 ~ lidstone smoothing).
     * @returns sentiment for the new term (1 ~ positive | -1 ~ negative).
     */
    NiaveBayes.prototype.predic = function (newTerms, model, alpha) {
        // Class-conditional Probabilities for Class Positive
        var ccpPositiveTerms = this.calcCCP(newTerms, model.terms.positive, model.sumAllTFIDFPositive, model.v, alpha);
        // Class-conditional Probabilities for Class Negative
        var ccpNegativeTerms = this.calcCCP(newTerms, model.terms.negative, model.sumAllTFIDFNegative, model.v, alpha);
        var ccpPositive = ccpPositiveTerms.reduce(function (accumulator, currentValue) { return accumulator * currentValue; });
        var ccpNegative = ccpNegativeTerms.reduce(function (accumulator, currentValue) { return accumulator * currentValue; });
        var classPositive = ccpPositive * model.pbClassPositive;
        var classNegative = ccpNegative * model.pbClassNegative;
        if (classPositive > classNegative) {
            return 1;
        }
        if (classNegative > classPositive) {
            return -1;
        }
        return 0;
    };
    NiaveBayes.prototype.testing = function (test, model, alpha) {
        var cm = {
            TP: 0,
            TN: 0,
            FP: 0,
            FN: 0,
            accuracy: 0,
            percision: 0,
            recall: 0,
        };
        for (var i = 0; i < test.positive.length; i++) {
            this.predic(test.positive[i], model, alpha) === 1 ? cm.TP++ : cm.FN++;
        }
        for (var i = 0; i < test.negative.length; i++) {
            this.predic(test.negative[i], model, alpha) === -1 ? cm.TN++ : cm.FP++;
        }
        cm.accuracy = (cm.TP + cm.TN) / (cm.TP + cm.TN + cm.FP + cm.FN);
        cm.percision = cm.TP / (cm.TP + cm.FP);
        cm.recall = cm.TP / (cm.TP + cm.FN);
        this.logger.info("TP: ".concat(cm.TP, " | TN: ").concat(cm.TN, " | FP: ").concat(cm.FP, " | FN: ").concat(cm.FN));
        return cm;
    };
    /**
     * training naive bayes to do sentiment analysis.
     * clasified text to class postive or negative.
     * @param train - data training
     * @param testing - data testing
     */
    NiaveBayes.prototype.fit = function (train, test) {
        //prior probability of class prositive.
        var pbClassPositive = train.positive.length / (train.positive.length + train.negative.length);
        //prior probabilityevidence of class negative.
        var pbClassNegative = train.positive.length / (train.positive.length + train.negative.length);
        var _a = this.prosesData(train.positive), positiveUniqueTerms = _a.uniqueTerms, sumAllTFIDFPositive = _a.sumAllTFIDF;
        this.logger.debug("Positive unique terms ".concat(positiveUniqueTerms.length));
        var _b = this.prosesData(train.negative), negativeUniqueTerms = _b.uniqueTerms, sumAllTFIDFNegative = _b.sumAllTFIDF;
        this.logger.debug("Negative unique terms ".concat(negativeUniqueTerms.length));
        //The size of the vocabulary (number of different words in the training set).
        var v = this.getUniqueTerms(train.positive.concat(train.negative)).length;
        // this.logger.info(`Total Atribut: ${positiveUniqueTerms.length + negativeUniqueTerms.length}`);
        var model = {
            terms: {
                positive: positiveUniqueTerms,
                negative: negativeUniqueTerms,
            },
            pbClassPositive: pbClassPositive,
            pbClassNegative: pbClassNegative,
            sumAllTFIDFNegative: sumAllTFIDFNegative,
            sumAllTFIDFPositive: sumAllTFIDFPositive,
            v: v,
        };
        console.time('testing');
        var confusionMatrix = this.testing(test, model, 1);
        this.logger.info("Accuracy ".concat((confusionMatrix.accuracy * 100).toFixed(2), "% | Percision: ").concat((confusionMatrix.percision * 100).toFixed(2), "% | Recall: ").concat((confusionMatrix.recall * 100).toFixed(2), "%"));
        console.timeEnd('testing');
        this.saveModelJSON(model);
    };
    /**
     * extract unique terms in all documents.
     * @param {2d array of string} arr - array to extract uniq vlaue form.
     * @returns array of unique terms
     */
    NiaveBayes.prototype.getUniqueTerms = function (arr) {
        var newArr = underscore_1.default.flatten(arr); // transfor array to 1D array of string.
        return underscore_1.default.uniq(newArr); // get all anique value in all array.
    };
    /**
     * coun number of documents that contain the term t.
     * @param {string} term - word or term to search in collection of documnets.
     * @param {Array2DString} arr - collection of documetns.
     * @returns The number of documents that contain the term t.
     */
    NiaveBayes.prototype.countNdt = function (term, arr) {
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf(term) !== -1) {
                count++;
            }
        }
        return count;
    };
    /**
     * extract unique terms in all documents.
     * calc tf-idf and ndt for each terms.
     * ndt: The number of documents that contain the term t.
     * @param {2d array of string} arr - array to extract uniq vlaue form.
     * @returns array of {terms, ndt, tfidf}
     */
    NiaveBayes.prototype.prosesData = function (arr) {
        var _this = this;
        var sumAllTFIDF = 0;
        var uniqueTerms = this.getUniqueTerms(arr).map(function (term) {
            var ndt = _this.countNdt(term, arr); //The number of documents that contain the term t.
            var tfidf = _this.sumTFIDF(term, ndt, arr);
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
    };
    /**
     * sum all tf-idf of a term from collection of documents.
     * @param term - he term to find or calc sum of tf-idf from collection of documents.
     * @param ndt - The number of documents that contain the term t.
     * @param arr - collection of documents
     * @returns sum of tf-idf from collection of documents
     */
    NiaveBayes.prototype.sumTFIDF = function (term, ndt, arr) {
        var currTFIDF = 0;
        for (var i = 0; i < arr.length; i++) {
            currTFIDF += this.calcTFIDF(term, arr.length, ndt, arr[i]);
        }
        return currTFIDF;
    };
    /**
     * find or calculate tf-idf of a term in a document.
     * @param {string} term - the term to find or calc tf-idf in a document.
     * @param {number} nd - the total number of documents.
     * @param {number} ndt - the number of documents that contain the term t.
     * @param {Array<string>} terms - the Document term t to be find or calc.
     * @returns tf-idf of  term.
     */
    NiaveBayes.prototype.calcTFIDF = function (term, nd, ndt, terms) {
        var rawTF = terms.filter(function (e) { return e === term; }).length; //Raw term frequency (the count of term t in document d).
        var nt = terms.length; //The total number of terms in document d.
        var tf = rawTF / nt; //term frequecy
        var idf = Math.log2(nd / ndt); //document inverse frequecy
        return tf * idf; //tf-idf
    };
    NiaveBayes.prototype.calcCCP = function (newTerms, modelTerms, sumAllTFIDF, v, alpha) {
        var _a;
        var ccp = []; //class-conditional probabilities
        var _loop_1 = function (i) {
            var tfidf = ((_a = underscore_1.default.find(modelTerms, function (e) { return e.term === newTerms[i]; })) === null || _a === void 0 ? void 0 : _a.tfidf) || 0;
            var a = tfidf + alpha;
            var b = sumAllTFIDF + alpha * v;
            ccp.push(a / b);
        };
        for (var i = 0; i < newTerms.length; i++) {
            _loop_1(i);
        }
        return ccp;
    };
    NiaveBayes.prototype.saveModelJSON = function (model) {
        var _this = this;
        var filePath = path_1.default.join(__dirname, '..', 'assets/data/trained_model.json');
        fs_1.default.writeFile(filePath, JSON.stringify(model), { encoding: 'utf-8' }, function (err) {
            if (err) {
                _this.logger.error('Failed write model to JSON');
                throw err;
            }
            _this.logger.info('model saved to JSON file.');
        });
    };
    NiaveBayes = __decorate([
        (0, typedi_1.Service)(),
        __param(0, (0, typedi_1.Inject)('logger')),
        __metadata("design:paramtypes", [Object])
    ], NiaveBayes);
    return NiaveBayes;
}());
exports.default = NiaveBayes;
