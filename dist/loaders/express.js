"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var HttpException_1 = __importDefault(require("../exceptions/HttpException"));
// import cors from 'cors';
var config_1 = __importDefault(require("../config"));
var api_1 = __importDefault(require("../api"));
exports.default = (function (app, next) {
    app.get("/status", function (_req, res) {
        res.status(200).end();
    });
    app.head("/status", function (_req, res) {
        res.status(200).end();
    });
    // app.use(cors());
    app.use(express_1.default.json());
    // Load API routes
    app.use(config_1.default.api.prefix, (0, api_1.default)());
    // Next Page handler
    app.get("*", function (req, res) {
        return next.render(req, res, "".concat(req.path), req.query);
    });
    /// catch 404 and forward to error handler
    app.use(function (_req, _res, next) {
        next(new HttpException_1.default(404, "Not Found"));
    });
    /// error handlers
    app.use(function (err, _req, res, next) {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === "UnauthorizedError") {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use(function (err, _req, res, _next) {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
});
