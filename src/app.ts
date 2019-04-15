import express from "express";
import bodyParser from "body-parser";
import * as defaultController from "./controller/default";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import logger from "./util/logger";
import { IRequestBody, IResponseError } from "./interfaces";

const app = express();

// Express configuration
app.set( "port", process.env.PORT || 3000 );


app.get( "/", defaultController.test );

app.use( bodyParser.json() );

app.use( (req: Request, res: Response, next: NextFunction) => {
    logger.info( "[REQUEST] " + JSON.stringify( req.body ) );
    next();
} );

app.post( "/", defaultController.cache );
app.post( "/", defaultController.existed );
app.post( "/", defaultController.newTicket );
// app.post( "/", defaultController.newTicketOld );

// error handling
app.use( (err: any, req: Request, res: Response, next: NextFunction) => {
    const requestBody = <IRequestBody>req.body;
    if (err && err.message) {
        const errorMessage: IResponseError = createErrorResponse( requestBody.id, err.message )
        logger.error( "[RESPONSE]" + JSON.stringify( errorMessage ) );
        res.json( errorMessage );
    } else {
        next();
    }
} );

app.use( (req: Request, res: Response) => {
    res.status( 404 ).send( '404 Not Found' );
} );

function createErrorResponse(idRound: number, message: string = "Error", code: number = -32000): IResponseError {
    return { id: idRound, error: { code: code, message: message }, jsonrpc: "2.0" }
}


// Connect to MongoDB
const mongoUrl = 'mongodb://localhost:27017/test';
mongoose.connect( mongoUrl, { useNewUrlParser: true } ).catch( err => {
    console.log( "MongoDB connection error. Please make sure MongoDB is running. " + err );
    process.exit( 1 );
} );

export default app;