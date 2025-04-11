import mongoose from "mongoose";
import { Schema } from "mongoose";
const likeSchema = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required:true},
    associatedPost: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
}, {timestamps:true})
export const Like = mongoose.model("Like", likeSchema)