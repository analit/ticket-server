"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ticket_1 = __importDefault(require("../model/ticket"));
const series_1 = __importDefault(require("../model/series"));
const constants_1 = require("../constants");
const logger_1 = __importDefault(require("../util/logger"));
exports.test = (req, res) => {
    res.send("<p>It's worked!</p>");
};
exports.cache = (req, res, next) => {
    const requestBody = req.body;
    ticket_1.default.findById(requestBody.id, (err, ticket) => {
        if (ticket) {
            logger_1.default.info("[RESPONSE][Cache]" + JSON.stringify(ticket.getCache()));
            res.json(ticket.getCache());
        }
        else {
            next();
        }
    });
};
exports.existed = (req, res, next) => {
    const requestBody = req.body;
    /** only roundbet */
    if (requestBody.params.Ticket.Win == 0) {
        return next();
    }
    ticket_1.default.findOne({ round: requestBody.params.RoundId }, (err, ticket) => {
        let responseBody;
        let newTicket = createNewTicket(requestBody);
        if (ticket) {
            // success
            newTicket.number = ticket.number;
            responseBody = createSuccessResponse(constants_1.ticketStatus.EXISTED, newTicket);
        }
        else {
            return next(new Error("Round not found"));
        }
        newTicket.cache = JSON.stringify(responseBody);
        newTicket.save({}, (err, ticket) => {
            if (err) {
                next(err);
            }
            logger_1.default.info("[RESPONSE]" + JSON.stringify(responseBody));
            res.json(responseBody);
        });
    });
};
exports.newTicket = (req, res, next) => {
    const requestBody = req.body;
    const bet = requestBody.params.Ticket.Bet;
    series_1.default.findById(bet, (err, series) => {
        if (err) {
            return next(err);
        }
        if (!series) {
            const message = `Series for ${bet} not found!`;
            return next(new Error(message));
        }
        const ticket = createNewTicket(requestBody, generateTicketNumber(series.series));
        const responseBody = createSuccessResponse(constants_1.ticketStatus.NEW, ticket);
        ticket.cache = JSON.stringify(responseBody);
        ticket.save({}, (err, ticket) => {
            if (err) {
                // console.log( err );
                next(err);
            }
            logger_1.default.info("[RESPONSE]" + JSON.stringify(responseBody));
            res.json(responseBody);
        });
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
function createNewTicket(requestBody, number) {
    return new ticket_1.default({
        _id: requestBody.id,
        game: requestBody.params.GameId,
        date: new Date(),
        round: requestBody.params.RoundId,
        number: number,
        bet: requestBody.params.Ticket.Bet,
        win: requestBody.params.Ticket.Win
    });
}
function generateTicketNumber(prefix) {
    return (prefix + `f${(+new Date).toString(16)}`).toUpperCase();
}
