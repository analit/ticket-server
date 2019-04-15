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
const seriesSchema = new mongoose.Schema({
    _id: Number,
    series: String,
    total_count: Number
});
seriesSchema.methods.getType = () => "Series";
exports.default = mongoose.model("Series", seriesSchema);
