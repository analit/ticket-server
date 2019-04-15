import * as mongoose from 'mongoose';


const seriesSchema = new mongoose.Schema({
    _id: Number,
    series: String,
    total_count: Number
});

export type SeriesModel = mongoose.Document & {
    series: string
    getType(): string
}

seriesSchema.methods.getType = (): string => "Series";

export default mongoose.model("Series", seriesSchema);