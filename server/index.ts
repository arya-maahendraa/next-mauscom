import "reflect-metadata";
import express from "express";
import config from "./config";
import Logger from "./loaders/logger";
import next from "next";

const server = express();
const app = next({ dev: process.env.NODE_ENV !== "production" });
async function startServer() {
   try {
      await app.prepare();
      await require("./loaders").default(server, app);
      server
         .listen(config.server_port, () => {
            Logger.info(`Server listening on port: ${config.server_port}`);
         })
         .on("error", (err) => {
            Logger.error(err);
            process.exit(1);
         });
   } catch (err) {
      console.log(err);
      Logger.error(err);
      process.exit(1);
   }
}
startServer();
