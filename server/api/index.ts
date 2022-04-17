import { Router } from "express";
import prosesRoutes from "./routes/proses";
import sentimentRoutes from "./routes/sentiment";

export default (): Router => {
   const app = Router();
   prosesRoutes(app);
   sentimentRoutes(app);
   return app;
};
