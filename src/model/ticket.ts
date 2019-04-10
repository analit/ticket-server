import * as mongoose from 'mongoose'
import { IResponseBody } from "../interfaces";

const ticketSchema = new mongoose.Schema( {
    _id: Number,
    game: String,
    date: Date,
    round: Number,
    number: String,
    bet: Number,
    win: Number,
    cache: String
} );

export type TicketModel = mongoose.Document & {
    _id: number,
    game: string,
    date: string,
    round: number,
    number: string,
    bet: number,
    win: number,
    cache: string,
    getCache: () => IResponseBody
}

ticketSchema.methods.getCache = function (): IResponseBody {
    return JSON.parse( this.cache );
}

export default mongoose.model( "Ticket", ticketSchema );