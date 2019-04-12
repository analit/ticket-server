import request from "supertest";
import app from "../../src/app";
import { default as Ticket } from "../../src/model/ticket";
import { IRequestBody } from "../../src/interfaces";

const chai = require( "chai" );
const expect = chai.expect;

it( "GET / - should return 200 OK", () => {
    return request( app ).get( "/" ).expect( 200 );
} )

it( "POST / - response error", (done) => {
    const bodyIt: IRequestBody = {
        "jsonrpc": "2.0",
        "method": "Ticket.Get",
        "id": 7744422716,
        "params": {
            "SessionId": "00000000B353B6A9",
            "RoundId": 370545399,
            "GameId": "shooting_stars",
            "Ticket": {
                "Bet": 502,
                "Win": 0,
                "isFreeSpin": 0,
                "GambleCount": 0
            }
        }
    }

    request( app )
        .post( "/" )
        .send( bodyIt )
        .expect( 200 )
        .end( function (err, res) {
            if (err) return done( err );
            expect( res.body.error ).to.not.be.undefined;
            expect( res.body.error.message ).to.equal( 'Series for 502 not found!' );
            done();
        } );

} );

it( "POST / error Round Not Found", (done) => {
    const bodyIt: IRequestBody = {
        "jsonrpc": "2.0",
        "method": "Ticket.Get",
        "id": 7744422717,
        "params": {
            "SessionId": "00000000B353B6A9",
            "RoundId": 1232125,
            "GameId": "shooting_stars",
            "Ticket": {
                "Bet": 0,
                "Win": 100,
                "isFreeSpin": 0,
                "GambleCount": 0
            }
        }
    }

    request( app )
        .post( "/" )
        .send( bodyIt )
        .expect( 200 )
        .end( function (err, res) {
            if (err) return done( err );
            expect( res.body.error ).to.not.be.undefined;
            expect( res.body.error.message ).to.equal( 'Round not found' );
            done();
        } );
} )

it( "POST / success", (done) => {
    Ticket.remove( {}, (err) => {

        const bodyIt: IRequestBody = {
            "jsonrpc": "2.0",
            "method": "Ticket.Get",
            "id": 7744422718,
            "params": {
                "SessionId": "00000000B353B6A9",
                "RoundId": 370545389,
                "GameId": "shooting_stars",
                "Ticket": {
                    "Bet": 500,
                    "Win": 0,
                    "isFreeSpin": 0,
                    "GambleCount": 0
                }
            }
        }

        request( app )
            .post( "/" )
            .send( bodyIt )
            .expect( 200 )
            .then( (res) => {
                if (err) return done( err );

                expect( res.body.id ).to.equal( 7744422718 )
                expect( res.body.result.Status ).to.equal( "new" )
                expect( res.body.result.TicketId ).to.have.string( "LCZ001" )

                const ticket: string = res.body.result.TicketId

                bodyIt.id = 7744422719;
                bodyIt.params.Ticket.Bet = 0;
                bodyIt.params.Ticket.Win = 100;
                request( app )
                    .post( "/" )
                    .send( bodyIt )
                    .expect( 200 )
                    .end( (err, res) => {
                        if (err) return done( err );
                        expect( res.body.id ).to.equal( 7744422719 )
                        expect( res.body.result.Status ).to.equal( "existed" )
                        expect( res.body.result.TicketId ).to.equal( ticket );
                        done();
                    } );
            } );
    } );
} )