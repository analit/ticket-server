import { NextFunction, Request, Response } from "express";
import { IRequestBody, IResponseBody, IResponseError } from "../interfaces";
import { default as Ticket, TicketModel } from "../model/ticket";
import { default as Series, SeriesModel } from "../model/series";
import { default as Prefix, PrefixModel } from "../model/prefix";
import { ticketStatus } from "../constants";
import logger from "../util/logger";

export let test = (req: Request, res: Response) => {
    res.send("<p>It's worked!</p>");
}

export const cache = (req: Request, res: Response, next: NextFunction): void => {
    const requestBody = <IRequestBody>req.body;
    Ticket.findById(requestBody.id, (err: Error, ticket: TicketModel) => {
        if (ticket) {
            logger.info("[RESPONSE][Cache]" + JSON.stringify(ticket.getCache()));
            res.json(ticket.getCache());
        } else {
            next();
        }
    });
}

export const existed = (req: Request, res: Response, next: NextFunction): void => {

    const requestBody = <IRequestBody>req.body;
    /** only roundbet */
    if (requestBody.params.Ticket.Win == 0) {
        return next();
    }
    Ticket.findOne({ round: requestBody.params.RoundId }, (err: Error, ticket: TicketModel) => {
        let responseBody: IResponseError | IResponseBody;
        let newTicket = createNewTicket(requestBody);
        if (ticket) {
            // success
            newTicket.number = ticket.number;
            responseBody = createSuccessResponse(ticketStatus.EXISTED, newTicket);
        } else {
            return next(new Error("Round not found"));
        }
        newTicket.cache = JSON.stringify(responseBody);
        newTicket.save({}, (err: any, ticket: TicketModel) => {
            if (err) {
                next(err);
            }
            logger.info("[RESPONSE]" + JSON.stringify(responseBody));
            res.json(responseBody);
        })
    })
}

export const newTicket = (req: Request, res: Response, next: NextFunction) => {

    const requestBody = <IRequestBody>req.body;
    const bet: number = requestBody.params.Ticket.Bet;

    Series.findById(bet)
        .then((series: SeriesModel) => {
            if (series) {
                return series;
            }

            return Prefix.findOneAndDelete()
        })
        .then((result: PrefixModel | SeriesModel | null) => {

            if (!result) {
                throw new Error(`Series for ${bet} not found!`);
            }

            if (result.getType() == "Prefix") {
                const newSeries = new Series({ _id: bet, series: <PrefixModel>result._id })
                return newSeries.save();
            }

            return <SeriesModel>result;
        })
        .then((series: SeriesModel) => {

            const ticket = createNewTicket(requestBody, generateTicketNumber(series.series));
            const responseBody = createSuccessResponse(ticketStatus.NEW, ticket);
            ticket.cache = JSON.stringify(responseBody);

            ticket.save({}, (err: any, ticket: TicketModel) => {
                if (err) {
                    // console.log( err );
                    next(err);
                }
                logger.info("[RESPONSE]" + JSON.stringify(responseBody));
                res.json(responseBody);
            })
        })
        .catch((err) => next(err));


    // Series.findById(bet, (err: any, series: SeriesModel) => {

    //     if (err) {
    //         return next(err);
    //     }

    //     if (!series) {
    //         const message: string = `Series for ${bet} not found!`;
    //         return next(new Error(message));
    //     }

    //     const ticket = createNewTicket(requestBody, generateTicketNumber(series.series));
    //     const responseBody = createSuccessResponse(ticketStatus.NEW, ticket);
    //     ticket.cache = JSON.stringify(responseBody);

    //     ticket.save({}, (err: any, ticket: TicketModel) => {
    //         if (err) {
    //             // console.log( err );
    //             next(err);
    //         }
    //         logger.info("[RESPONSE]" + JSON.stringify(responseBody));
    //         res.json(responseBody);
    //     })
    // });
}


function createSuccessResponse(status: string, ticket: TicketModel): IResponseBody {

    return {
        id: ticket._id,
        jsonrpc: "2.0",
        result: {
            Status: status,
            RoundId: ticket.round,
            TicketId: ticket.number
        }
    }
}

function createNewTicket(requestBody: IRequestBody, number?: string): any {

    return new Ticket({
        _id: requestBody.id,
        game: requestBody.params.GameId,
        date: new Date(),
        round: requestBody.params.RoundId,
        number: number,
        bet: requestBody.params.Ticket.Bet,
        win: requestBody.params.Ticket.Win
    });
}


/**
 * Ex. LDR001960962533453, LCZ001579029372012, LCN001924731796542
 * where prefix - LDR001, LCZ001, LCN001
 * unique - 960962533453, 579029372012, 924731796542 (12-digits)
 * @param prefix
 */
function generateTicketNumber(prefix: string): string {

    let start: string = Math.random().toString().substring(2, 6);
    let end: string = Date.now().toString().substring(5);
    
    return prefix + start + end;
}
