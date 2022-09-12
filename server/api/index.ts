import { Router } from "express";
import prosesRoutes from "./routes/proses";
import sentimentRoutes from "./routes/sentiment";
import trainData from "./routes/trainData";

export default (): Router => {
   const app = Router();
   prosesRoutes(app);
   sentimentRoutes(app);
   trainData(app);
   return app;
};
