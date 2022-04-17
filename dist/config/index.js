"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var envIsFound = dotenv_1.default.config();
if (envIsFound.error) {
    throw new Error("Couldn't find .env file");
}
exports.default = {
    server_port: parseInt(process.env.SERVER_PORT || "3000", 10),
    api: {
        prefix: "/api",
    },
    log: {
        level: process.env.LOG_LEVEL || "silly",
    },
    youtubeAPI: {
        url: process.env.YOUTUBE_API_URL,
        key: process.env.YOUTUBE_API_KEY,
    },
};
