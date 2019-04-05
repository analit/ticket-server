"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_1 = __importDefault(require("../model/ticket"));
const constants_1 = require("../constants");
exports.index = (req, res) => {
    const requestBody = req.body;
    const newTicket = createNewTicket(requestBody);
    newTicket.save({}, (err, ticket) => {
        if (err) {
            console.log(err);
        }
        res.json(createSuccessResponse(constants_1.ticketStatus.NEW, ticket));
    });
};
function createSuccessResponse(status, ticket) {
    return {
        id: ticket._id,
        jsonrpc: "2.0",
        result: {
            Status: status,
            RoundId: ticket.round,
            TicketId: ticket.number
        }
    };
}
function createNewTicket(requestBody) {
    return new ticket_1.default({
        _id: requestBody.id,
        game: requestBody.params.GameId,
        date: new Date(),
        round: requestBody.params.RoundId,
        number: generateTicket(requestBody.params.Ticket.Bet),
        bet: requestBody.params.Ticket.Bet,
        win: requestBody.params.Ticket.Win
    });
}
function generateTicket(bet) {
    const prefix = "LQU001";
    return (prefix + `f${(+new Date).toString(16)}`).toUpperCase();
}
