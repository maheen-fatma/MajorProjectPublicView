import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const searchPost = asyncHandler (async(req,res) => {
    const {query} = req.query
    if(!query){
        throw new ApiError(404, "search query required")
    }

    const post = await Post.find({
        content: {$regex: query, $options: "i"}
    })

    return res.status(201).json(new ApiResponse(201, post, "Search successful"));
})

const searchUser = asyncHandler (async (req, res)=> {
    const {query} = req.query
    if(!query){
        throw new ApiError(404, "search query required")
    }

    const user = await User.find({
        username: {$regex: `^${query}$`, $options: "i"}
    })

    return res.status(201).json(new ApiResponse(201, user, "Search successful"));
})

export {
    searchPost,
    searchUser
}