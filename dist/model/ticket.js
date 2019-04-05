"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const ticketSchema = new mongoose.Schema({
    _id: Number,
    game: String,
    date: Date,
    number: String,
    ticket: String,
    bet: Number,
    win: Number
});
ticketSchema.statics.generateTicket = function (prefix = 'L00M') {
    return prefix + '10001000';
};
ticketSchema.methods.generate = function (prefix = 'L00M') {
    return prefix + '10001000';
};
exports.default = mongoose.model("Ticket", ticketSchema);
// export const Ticket:TicketModel = mongoose.model( "Ticket", ticketSchema );
//# sourceMappingURL=ticket.js.map