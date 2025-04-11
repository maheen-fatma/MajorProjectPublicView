import mongoose from "mongoose";
import { Schema } from "mongoose";
const postSchema = new mongoose.Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    purchaseLink: { type: String, default: '' },
    imageFile: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
},{timestamp:true})

export const Post = mongoose.model("Post", postSchema)