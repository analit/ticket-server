import request from "supertest";
import app from "../../src/app";
import { default as Ticket } from "../../src/model/ticket";
import { IRequestBody } from "../../src/interfaces";

const chai = require( "chai" );
const expect = chai.expect;

const body: IRequestBody = {
    "jsonrpc": "2.0",
    "method": "Ticket.Get",
    "id": 7744422719,
    "params": {
        "SessionId": "00000000B353B6A9",
        "RoundId": 370545399,
        "GameId": "shooting_stars",
        "Ticket": {
            "Bet": 0,
            "Win": 0,
            "isFreeSpin": 0,
            "GambleCount": 0
        }
    }
}

// beforeEach( () => {
//     console.log( "clear DB" );
//     // Ticket.remove({});
// } );


describe( "GET /", () => {
    it( "should return 200 OK", () => {
        return request( app ).get( "/" ).expect( 200 );
    } )
} )

describe( "POST /", () => {
    it( "response error", (done) => {
        // function test() {
        request( app )
            .post( "/" )
            .send( body )
            .expect( 200 )
            .end( function (err, res) {
                if (err) return done( err );
                expect( res.body.error ).not.to.be.undefined;
                expect( res.body.error.message ).to.equal( "Error: Round not found" );
                done();
            } );


        // }

        // Ticket.remove( {}, test );
    } );

} )

// describe( "POST /", () => {
//     it( "response new", (done) => {
//         const bodyRoundBet: IRequestBody = body;
//         bodyRoundBet.id = 7744422720;
//         bodyRoundBet.params.Ticket.Win = 0;
//         bodyRoundBet.params.Ticket.Bet = 0;
//
//         request( app )
//             .post( "/" )
//             .send( bodyRoundBet )
//             .expect( 200 )
//             .end( function (err, res) {
//                 if (err) return done( err );
//                 expect( res.body.error ).to.be.undefined;
//                 // expect( res.body.error.message ).to.equal( "Error: Round not found" );
//                 console.log( res.body );
//                 done();
//             } );
//     } );
// } )
