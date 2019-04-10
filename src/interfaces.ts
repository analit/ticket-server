interface IRequestBody {
    jsonrpc: string,
    method: string,
    id: number,
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
    id: number,
    result: {
        Status: string,
        RoundId: number,
        TicketId?: string
    }
}

interface IResponseError {
    id: number,
    error: { code: number, message: string },
    jsonrpc: string
}

export { IRequestBody, IResponseBody, IResponseError }