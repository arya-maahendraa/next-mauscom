"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var prosesController_1 = __importDefault(require("../controllers/prosesController"));
var route = (0, express_1.Router)();
exports.default = (function (app) {
    app.use('/proses', route);
    route.post('/comments', prosesController_1.default.prosesComments);
});
