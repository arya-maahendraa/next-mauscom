import fs from "fs";
import path from "path";
import { stopWords, slanglWords } from "./loaders/dataLoader";
import akarata from "akarata";
import Preprocessing from "./services/Preprocessing";
import NaiveNayes from "./services/NaiveBayes";
import logger from "./loaders/logger";

/**
 * load and preprocess training data
 * @param {string} path - path to train data file csv
 * @returns preprocessed data
 */
function loadTrainingData(path: string): {
   trainData: TrainData;
   testData: TestData;
} {
   logger.info("Loading and preprocess training data");
   const preprocessing = new Preprocessing(slanglWords, stopWords, akarata);
   const rawTrainData = fs
      .readFileSync(path)
      .toString("utf-8")
      .split("\r\n")
      .map((term) => {
         const terms = term.split(";").map((e) => e.trim());
         return {
            text: preprocessing.process(terms[0]),
            class: terms[1],
         };
      })
      .filter((e) => e.text.length > 0);
   return splitTrainingAndTesting(rawTrainData);
}

/**
 * Shuffle data to create random train data and test data.
 * @param {RawData} arr - Raw data to Shuffle
 * @returns Shuffuled data
 */
function shuffleData(arr: Array<Array<string>>): Array<Array<string>> {
   let m = arr.length;
   while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[i], arr[m]] = [arr[m], arr[i]];
   }
   return arr;
}
/**
 * Split data train and test data with ratio 80:20
 * @param {RawData} data - data to split
 * @returns
 */
function splitTrainingAndTesting(data: RawData): {
   trainData: TrainData;
   testData: TestData;
} {
   logger.debug(`Total Data: ${data.length}`);

   let positiveData: Array<Array<string>> = [];
   let negativeData: Array<Array<string>> = [];
   const trainData: TrainData = { positive: [], negative: [] };
   const testData: TestData = { positive: [], negative: [] };
   const percenTrainData = 80; //variable for split ratio

   /**
    * split data by class
    */
   for (let i = 0; i < data.length; i++) {
      if (data[i].class === "positive") {
         positiveData.push(data[i].text);
      } else {
         negativeData.push(data[i].text);
      }
   }
   logger.info("shuffling Array");
   positiveData = shuffleData(positiveData);
   negativeData = shuffleData(negativeData);

   logger.debug(
      `Positive: ${positiveData.length} | Negative: ${negativeData.length}`
   );

   /**
    * calculate total data for test and train data
    */
   const totalTrainDataPositive = Math.floor(
      (positiveData.length / 100) * percenTrainData
   );
   const totalTrainDataNegative = Math.floor(
      (negativeData.length / 100) * percenTrainData
   );
   trainData.positive = positiveData.slice(0, totalTrainDataPositive);
   trainData.negative = negativeData.slice(0, totalTrainDataNegative);
   testData.positive = positiveData.slice(
      totalTrainDataPositive + 1,
      positiveData.length - 1
   );
   testData.negative = negativeData.slice(
      totalTrainDataNegative + 1,
      negativeData.length - 1
   );

   logger.debug(`Total Data Train Positive: ${trainData.positive.length}`);
   logger.debug(`Total Data Train Negative: ${trainData.negative.length}`);
   logger.debug(`Total Data Test Positive: ${testData.positive.length}`);
   logger.debug(`Total Data Test Negative: ${testData.negative.length}`);

   return {
      trainData: trainData,
      testData: testData,
   };
}

function loadTrainingAdnTestData(trainPath: string, testPath: string) {
   logger.info("Loading and preprocess training data");
   const preprocessing = new Preprocessing(slanglWords, stopWords, akarata);
   const trainData: TrainData = { positive: [], negative: [] };
   const testData: TestData = { positive: [], negative: [] };
   const rawTrainData = fs
      .readFileSync(trainPath)
      .toString("utf-8")
      .split("\r\n")
      .map((term) => {
         const terms = term.split(";").map((e) => e.trim());
         return {
            text: preprocessing.process(terms[0]),
            class: terms[1],
         };
      })
      .filter((e) => e.text.length > 0);
   const rawTestData = JSON.parse(fs.readFileSync(testPath).toString("utf-8"));

   for (let i = 0; i < rawTrainData.length; i++) {
      if (rawTrainData[i].class === "positive") {
         trainData.positive.push(rawTrainData[i].text);
      } else {
         trainData.negative.push(rawTrainData[i].text);
      }
   }

   for (let i = 0; i < rawTestData.length; i++) {
      const text = preprocessing.process(rawTestData[i].text);
      if (text.length > 0) {
         if (rawTestData[i].class === "Positive") {
            testData.positive.push(text);
         } else {
            testData.negative.push(text);
         }
      }
   }

   return { trainData, testData };
}

function doTraining() {
   const dataTrainPath = path.join(__dirname, "assets/data/Dataset_indo.csv");
   const dataTestPath = path.join(
      __dirname,
      "assets/data/latih-debat-capres.json"
   );
   console.time("load training data");
   const { trainData, testData } = loadTrainingAdnTestData(
      dataTrainPath,
      dataTestPath
   );
   logger.info(
      `train data: ${
         trainData.positive.length + trainData.negative.length
      } | test data: ${testData.negative.length + testData.positive.length}`
   );
   logger.info(
      `total train postiive: ${trainData.positive.length} | total train negative: ${trainData.negative.length}`
   );
   logger.info(
      `total test postiive: ${testData.positive.length} | total test negative: ${testData.negative.length}`
   );
   logger.info("training data loaded!!");
   console.timeEnd("load training data");

   console.time("training");
   logger.info("###### START TRAINING!! ######");
   const naiveBayes = new NaiveNayes(logger);
   naiveBayes.fit(trainData, testData);
   logger.info("###### END TRAINING!! ######");
   console.timeEnd("training");
}

doTraining();
