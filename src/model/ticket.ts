import * as mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema( {
    _id: Number,
    game: String,
    date: Date,
    number: String,
    ticket: String,
    bet: Number,
    win: Number
} );

export type TicketModel = mongoose.Document & {
    _id: number,
    game: string,
    date: string,
    round: string,
    number: string,
    bet: number,
    win: number,
    generateTicket: (prefix: string) => string
}

ticketSchema.statics.generateTicket = function (prefix: string = 'L00M'): string {
    return prefix + '10001000';

}

ticketSchema.methods.generate = function (prefix: string = 'L00M'): string {
    return prefix + '10001000';

}

export default mongoose.model( "Ticket", ticketSchema );
// export const Ticket:TicketModel = mongoose.model( "Ticket", ticketSchema );