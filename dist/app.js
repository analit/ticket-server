"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const defaultController = __importStar(require("./controller/default"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
// Express configuration
app.set("port", process.env.PORT || 3000);
app.get("/", defaultController.test);
app.use(body_parser_1.default.json());
app.post("/", defaultController.index);
// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017/test';
mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true }).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(1);
});
exports.default = app;
