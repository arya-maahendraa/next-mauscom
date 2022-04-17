import express from "express";
import expressLoader from "./express";
import Logger from "./logger";
import dependencyInjectorLoader from "./dependencyInjector";
import { NextServer } from "next/dist/server/next";

export default async (
   expressApp: express.Application,
   nextApp: NextServer
): Promise<void> => {
   dependencyInjectorLoader();
   Logger.info("Dependency Injector loaded");
   expressLoader(expressApp, nextApp);
   Logger.info(`Express loaded!`);
};
