import mongoose from "mongoose";
import { Schema } from "mongoose";
const followingSchema = new mongoose.Schema({
    follower: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    followed: { type: Schema.Types.ObjectId, ref: 'User', required: true },
},{timestamps:true} )
export const Following = mongoose.model("Following",followingSchema)