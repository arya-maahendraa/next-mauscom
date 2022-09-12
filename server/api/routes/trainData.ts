import { NextFunction, Request, Response, Router } from "express";
import path from "path";
import Container from "typedi";
import { Logger } from "winston";
import fs from "fs";

const route = Router();

const addTrainDataController = (req: Request, res: Response) => {
   const logger: Logger = Container.get("logger");
   logger.info("Adding new data train from url: %o", req.body.url);

   const csvFilePath = path.join(
      __dirname,
      "../../",
      "assets/data/NewDataSet.csv"
   );
   const writer = fs.createWriteStream(csvFilePath, {
      flags: "a",
   });
   const newData = req.body.newData;
   if (newData && newData.length > 0) {
      for (let idx = 0; idx < newData.length; idx++) {
         const data = newData[idx];
         if (data.id && data.comment && data.class !== 0) {
            writer.write(
               `${data.comment.replace(";", "")};${
                  data.class === 1 ? "positive" : "negative"
               }\r\n`
            );
         }
      }
   }
   res.status(204).json({});
};

export default (app: Router): void => {
   app.use("/train-data", route);
   route.post("/add", addTrainDataController);
};
