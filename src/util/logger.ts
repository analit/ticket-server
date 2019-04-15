import winston from "winston";
import { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf } = format;

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
        new DailyRotateFile( { 
            filename: './log/champ-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '30d'
         } )
    ]
} )

logger.info( "Logging initialized!" )

export default logger;