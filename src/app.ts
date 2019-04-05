import express from "express";
import bodyParser from "body-parser";
import * as defaultController from "./controller/default";
import mongoose from "mongoose";

const app = express();

// Express configuration
app.set( "port", process.env.PORT || 3000 );
app.use( bodyParser.json() );
app.post( "/", defaultController.index );

// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017/test';
mongoose.connect( mongoUrl, { useNewUrlParser: true } ).catch( err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit(1);
} );

export default app;