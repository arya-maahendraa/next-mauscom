import { IModelData } from "../interfaces/IData";

declare global {
   export type TrainData = {
      positive: Array<Array<string>>;
      negative: Array<Array<string>>;
   };
   export type TestData = {
      positive: Array<Array<string>>;
      negative: Array<Array<string>>;
   };
   export type Array2DString = Array<Array<string>>;
   export type RawData = Array<IModelData>;
   export type NaiveBayesModel = {
      terms: {
         positive: Array<{
            term: string;
            tfidf: number;
         }>;
         negative: Array<{
            term: string;
            tfidf: number;
         }>;
      };
      pbClassPositive: number;
      pbClassNegative: number;
      sumAllTFIDFPositive: number;
      sumAllTFIDFNegative: number;
      v: number;
   };
   export type ConfusionMatrix = {
      TP: number;
      TN: number;
      FP: number;
      FN: number;
      accuracy: number;
      percision: number;
      recall: number;
   };
}
