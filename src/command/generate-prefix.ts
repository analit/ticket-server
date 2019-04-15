import mongoose from "mongoose";
import Prefix from "../model/prefix";


// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017/test';
mongoose.connect(mongoUrl, { useNewUrlParser: true }).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(1);
});

const inserts: { [key: string]: string }[] = [];

const firstSymbol = "D";
const symbols: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

symbols.split("").forEach((symbolA: string) => {
    symbols.split("").forEach((symbolB: string) => {
        inserts.push({ _id: firstSymbol + symbolA + symbolB + "001" });
    });
});

Prefix.deleteMany({}).then(() => {
    Prefix.insertMany(inserts, (err, prefixes) => {
        if (err) return console.log(err);
        console.log("Was added " + prefixes.length + " prefixes!");
        process.exit(0);
    });
})


