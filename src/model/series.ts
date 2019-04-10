import * as mongoose from 'mongoose';


const seriesSchema = new mongoose.Schema({
    _id: Number,
    series: String,
    total_count: Number
});

export type SeriesModel = mongoose.Document & {
    series: string
}

export default mongoose.model("Series", seriesSchema);