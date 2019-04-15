"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const prefix_1 = __importDefault(require("../model/prefix"));
// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017/test';
mongoose_1.default.connect(mongoUrl, { useNewUrlParser: true }).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(1);
});
const inserts = [];
const firstSymbol = "D";
const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
symbols.split("").forEach((symbolA) => {
    symbols.split("").forEach((symbolB) => {
        inserts.push({ _id: firstSymbol + symbolA + symbolB + "001" });
    });
});
prefix_1.default.deleteMany({}).then(() => {
    prefix_1.default.insertMany(inserts, (err, prefixes) => {
        if (err)
            return console.log(err);
        console.log("Was added " + prefixes.length + " prefixes!");
        process.exit(0);
    });
});
