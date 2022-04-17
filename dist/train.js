"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var dataLoader_1 = require("./loaders/dataLoader");
var akarata_1 = __importDefault(require("akarata"));
var Preprocessing_1 = __importDefault(require("./services/Preprocessing"));
var NaiveBayes_1 = __importDefault(require("./services/NaiveBayes"));
var logger_1 = __importDefault(require("./loaders/logger"));
/**
 * load and preprocess training data
 * @param {string} path - path to train data file csv
 * @returns preprocessed data
 */
function loadTrainingData(path) {
    logger_1.default.info("Loading and preprocess training data");
    var preprocessing = new Preprocessing_1.default(dataLoader_1.slanglWords, dataLoader_1.stopWords, akarata_1.default);
    var rawTrainData = fs_1.default
        .readFileSync(path)
        .toString("utf-8")
        .split("\r\n")
        .map(function (term) {
        var terms = term.split(";").map(function (e) { return e.trim(); });
        return {
            text: preprocessing.process(terms[0]),
            class: terms[1],
        };
    })
        .filter(function (e) { return e.text.length > 0; });
    return splitTrainingAndTesting(rawTrainData);
}
/**
 * Shuffle data to create random train data and test data.
 * @param {RawData} arr - Raw data to Shuffle
 * @returns Shuffuled data
 */
function shuffleData(arr) {
    var _a;
    var m = arr.length;
    while (m) {
        var i = Math.floor(Math.random() * m--);
        _a = [arr[m], arr[i]], arr[i] = _a[0], arr[m] = _a[1];
    }
    return arr;
}
/**
 * Split data train and test data with ratio 80:20
 * @param {RawData} data - data to split
 * @returns
 */
function splitTrainingAndTesting(data) {
    logger_1.default.debug("Total Data: ".concat(data.length));
    var positiveData = [];
    var negativeData = [];
    var trainData = { positive: [], negative: [] };
    var testData = { positive: [], negative: [] };
    var percenTrainData = 80; //variable for split ratio
    /**
     * split data by class
     */
    for (var i = 0; i < data.length; i++) {
        if (data[i].class === "positive") {
            positiveData.push(data[i].text);
        }
        else {
            negativeData.push(data[i].text);
        }
    }
    logger_1.default.info("shuffling Array");
    positiveData = shuffleData(positiveData);
    negativeData = shuffleData(negativeData);
    logger_1.default.debug("Positive: ".concat(positiveData.length, " | Negative: ").concat(negativeData.length));
    /**
     * calculate total data for test and train data
     */
    var totalTrainDataPositive = Math.floor((positiveData.length / 100) * percenTrainData);
    var totalTrainDataNegative = Math.floor((negativeData.length / 100) * percenTrainData);
    trainData.positive = positiveData.slice(0, totalTrainDataPositive);
    trainData.negative = negativeData.slice(0, totalTrainDataNegative);
    testData.positive = positiveData.slice(totalTrainDataPositive + 1, positiveData.length - 1);
    testData.negative = negativeData.slice(totalTrainDataNegative + 1, negativeData.length - 1);
    logger_1.default.debug("Total Data Train Positive: ".concat(trainData.positive.length));
    logger_1.default.debug("Total Data Train Negative: ".concat(trainData.negative.length));
    logger_1.default.debug("Total Data Test Positive: ".concat(testData.positive.length));
    logger_1.default.debug("Total Data Test Negative: ".concat(testData.negative.length));
    return {
        trainData: trainData,
        testData: testData,
    };
}
function loadTrainingAdnTestData(trainPath, testPath) {
    logger_1.default.info("Loading and preprocess training data");
    var preprocessing = new Preprocessing_1.default(dataLoader_1.slanglWords, dataLoader_1.stopWords, akarata_1.default);
    var trainData = { positive: [], negative: [] };
    var testData = { positive: [], negative: [] };
    var rawTrainData = fs_1.default
        .readFileSync(trainPath)
        .toString("utf-8")
        .split("\r\n")
        .map(function (term) {
        var terms = term.split(";").map(function (e) { return e.trim(); });
        return {
            text: preprocessing.process(terms[0]),
            class: terms[1],
        };
    })
        .filter(function (e) { return e.text.length > 0; });
    var rawTestData = JSON.parse(fs_1.default.readFileSync(testPath).toString("utf-8"));
    for (var i = 0; i < rawTrainData.length; i++) {
        if (rawTrainData[i].class === "positive") {
            trainData.positive.push(rawTrainData[i].text);
        }
        else {
            trainData.negative.push(rawTrainData[i].text);
        }
    }
    for (var i = 0; i < rawTestData.length; i++) {
        var text = preprocessing.process(rawTestData[i].text);
        if (text.length > 0) {
            if (rawTestData[i].class === "Positive") {
                testData.positive.push(text);
            }
            else {
                testData.negative.push(text);
            }
        }
    }
    return { trainData: trainData, testData: testData };
}
function doTraining() {
    var dataTrainPath = path_1.default.join(__dirname, "assets/data/Dataset_indo.csv");
    var dataTestPath = path_1.default.join(__dirname, "assets/data/latih-debat-capres.json");
    console.time("load training data");
    var _a = loadTrainingAdnTestData(dataTrainPath, dataTestPath), trainData = _a.trainData, testData = _a.testData;
    logger_1.default.info("train data: ".concat(trainData.positive.length + trainData.negative.length, " | test data: ").concat(testData.negative.length + testData.positive.length));
    logger_1.default.info("total train postiive: ".concat(trainData.positive.length, " | total train negative: ").concat(trainData.negative.length));
    logger_1.default.info("total test postiive: ".concat(testData.positive.length, " | total test negative: ").concat(testData.negative.length));
    logger_1.default.info("training data loaded!!");
    console.timeEnd("load training data");
    console.time("training");
    logger_1.default.info("###### START TRAINING!! ######");
    var naiveBayes = new NaiveBayes_1.default(logger_1.default);
    naiveBayes.fit(trainData, testData);
    logger_1.default.info("###### END TRAINING!! ######");
    console.timeEnd("training");
}
doTraining();
