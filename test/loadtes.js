let counter = 0;

const body = {
    "jsonrpc": "2.0",
    "method": "Ticket.Get",
    "id": 300000,
    "params": {
        "SessionId": "00000000B353B6A9",
        "RoundId": 300000,
        "GameId": "shooting_stars",
        "Ticket": {
            "Bet": 0,
            "Win": 0,
            "isFreeSpin": 0,
            "GambleCount": 0
        }
    }
};

module.exports = function (requestId) {
    ++counter;
    ++body.id;

    if (counter % 2) {
        // round bet
        ++body.params.RoundId;
        body.params.Ticket.Bet = 100;
        body.params.Ticket.Win = 0;
    } else {
        // round win
        body.params.Ticket.Bet = 0;
        body.params.Ticket.Win = 100;
    }

    // this object will be serialized to JSON and sent in the body of the request
    return body;
};