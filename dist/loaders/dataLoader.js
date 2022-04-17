"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.naiveBayesModel = exports.slanglWords = exports.stopWords = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var stopWordsPath = path_1.default.join(__dirname, '..', 'assets/data/id.stopwords.02.01.2016.txt');
var slangWordsPath = path_1.default.join(__dirname, '..', 'assets/data/colloquial-indonesian-lexicon.csv');
var fileModelPath = path_1.default.join(__dirname, '..', 'assets/data/trained_model.json');
var stopWords = fs_1.default.readFileSync(stopWordsPath).toString('utf-8').split('\n');
exports.stopWords = stopWords;
var naiveBayesModel = JSON.parse(fs_1.default.readFileSync(fileModelPath).toString('utf-8'));
exports.naiveBayesModel = naiveBayesModel;
var slanglWords = fs_1.default
    .readFileSync(slangWordsPath)
    .toString('utf-8')
    .split('\r\n')
    .map(function (term) {
    var newTerm = term.split(';').map(function (e) { return e.trim(); });
    return {
        slang: newTerm[0],
        formal: newTerm[1],
    };
});
exports.slanglWords = slanglWords;
