import mongoose from "mongoose";
import { Schema } from "mongoose";
const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    associatedPost: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
},{timestamp: true})
export const Comment = mongoose.model("Comment", commentSchema)