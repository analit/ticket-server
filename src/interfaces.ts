interface IRequestBody {
    jsonrpc: string,
    method: string,
    id: string,
    params: {
        SessionId: string,
        RoundId: number,
        GameId: string,
        Ticket: {
            Bet: number,
            Win: number,
            isFreeSpin: number,
            GambleCount: number
        }
    }
}

interface IResponseBody {
    jsonrpc: string,
    id: string,
    result: {
        Status: string,
        RoundId: string,
        TicketId?: string
    }
}

export { IRequestBody, IResponseBody }