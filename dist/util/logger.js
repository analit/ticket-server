"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_2 = require("winston");
const { combine, timestamp, printf } = winston_2.format;
//
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp}: ${level}: ${message}`;
});
const logger = winston_1.default.createLogger({
    level: "debug",
    format: combine(timestamp(), myFormat),
    transports: [
        new (winston_1.default.transports.File)({ filename: 'log/champ.log' })
    ]
});
logger.info("Logging initialized!");
exports.default = logger;
