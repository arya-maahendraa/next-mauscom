"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typedi_1 = require("typedi");
var logger_1 = __importDefault(require("./logger"));
var dataLoader_1 = require("./dataLoader");
var akarata_1 = __importDefault(require("akarata"));
exports.default = (function () {
    try {
        typedi_1.Container.set('logger', logger_1.default);
        typedi_1.Container.set('slanglWords', dataLoader_1.slanglWords);
        typedi_1.Container.set('stopWords', dataLoader_1.stopWords);
        typedi_1.Container.set('akarata', akarata_1.default);
        typedi_1.Container.set('naiveBayesModel', dataLoader_1.naiveBayesModel);
    }
    catch (err) {
        logger_1.default.error("Error on dependency injector loader: %o", err);
        throw err;
    }
});
