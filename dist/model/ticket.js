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
    round: Number,
    number: String,
    bet: Number,
    win: Number,
    cache: String
});
ticketSchema.methods.getCache = function () {
    return JSON.parse(this.cache);
};
exports.default = mongoose.model("Ticket", ticketSchema);
