import winston from "winston";
import { format } from "winston";

const { combine, timestamp, printf } = format;
//
const myFormat = printf( ({ level, message, timestamp }) => {
    return `${timestamp}: ${level}: ${message}`;
} );

const logger = winston.createLogger( {
    level: "debug",
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new (winston.transports.File)( { filename: 'log/champ.log' } )
    ]
} )

logger.info( "Logging initialized!" )

export default logger;