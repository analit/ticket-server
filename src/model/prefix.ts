import mongoose from "mongoose";

const prefixSchema = new mongoose.Schema({
    _id: String
});

export type PrefixModel = mongoose.Document & {
    _id: string,
    getType(): string
}

prefixSchema.methods.getType = (): string => "Prefix";

export default mongoose.model("Prefix", prefixSchema);