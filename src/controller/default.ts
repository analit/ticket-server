import { Request, Response } from "express";
import { IRequestBody, IResponseBody } from "../interfaces";
import { default as Ticket, TicketModel } from "../model/ticket";
import { ticketStatus } from "../constants";

export let index = (req: Request, res: Response) => {
    const requestBody = <IRequestBody>req.body;

    const newTicket = createNewTicket( requestBody );
    newTicket.save( {}, (err: any, ticket: TicketModel) => {
        if (err) {
            console.log( err );
        }
        res.json( createSuccessResponse( ticketStatus.NEW, ticket ) );
    } )
}

function createSuccessResponse(status: string, ticket:TicketModel): IResponseBody {

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

function createNewTicket(requestBody: IRequestBody): any {

    return new Ticket( {
        _id: requestBody.id,
        game: requestBody.params.GameId,
        date: new Date(),
        round: requestBody.params.RoundId,
        number: generateTicket( requestBody.params.Ticket.Bet ),
        bet: requestBody.params.Ticket.Bet,
        win: requestBody.params.Ticket.Win
    } );
}

function generateTicket(bet: number): string {
    const prefix: string = "LQU001";

    return (prefix + `f${(+new Date).toString( 16 )}`).toUpperCase();
}
