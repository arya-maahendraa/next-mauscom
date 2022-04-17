"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var proses_1 = __importDefault(require("./routes/proses"));
var sentiment_1 = __importDefault(require("./routes/sentiment"));
exports.default = (function () {
    var app = (0, express_1.Router)();
    (0, proses_1.default)(app);
    (0, sentiment_1.default)(app);
    return app;
});
