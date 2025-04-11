import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Like } from "../models/like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";

//this likes the post if not liked before. and unlikes if liked already
const likePost = asyncHandler( async(req,res)=>{
    const {id} = req.params // get the id of the post on which the like is being made
    const userId = req.user._id // get the id of the user doing the like

    if(!id)
        throw new ApiError(400, "No post found. Correct post id required")

    const post = await Post.findById(id)
    if(!post)
        throw new ApiError(404, "Post not found")

    const existingLike = await Like.findOne({owner: userId, associatedPost: id})
    if(existingLike){
        //Unlike the post
        await Like.findByIdAndDelete(existingLike._id)
        return res.status(200).json(new ApiResponse(200, null, "Post unliked successfully"));
    }

    const like = await Like.create({owner:userId, associatedPost:id})
    return res.status(201).json(new ApiResponse(201, like, "Post liked successfully"));
})

//checks if the given post is liked by the given user
const isLiked = asyncHandler( async(req,res)=>{
    const {id} = req.params // get the id of the post on which the like is being made
    const userId = req.user._id // get the id of the user doing the like
    
    if(!id)
        throw new ApiError(400, "No post found. Correct post id required")

    const post = await Post.findById(id)
    if(!post)
        throw new ApiError(404, "Post not found")

    const existingLike = await Like.findOne({owner: userId, associatedPost: id})

    if(existingLike){
        return res.status(200).json(new ApiResponse(200, true, "Post is already liked"));
    }
    return res.status(200).json(new ApiResponse(200, false, "Post is not liked"))
    
    
})

// users who liked the post along with the total count of likes
const getLikes = asyncHandler( async(req , res)=>{
    const {id} = req.params

    //retrive the usernames of the users who have liked the post with ID id
    const likes = await Like.find({associatedPost:id}).populate("owner","username")
    const likeCount = likes.length //number of likes

    return res.status(200).json(new ApiResponse(200, { likeCount, users: likes }, "Likes fetched successfully."));
})

const getLikedPostByUser = asyncHandler( async(req,res)=>{
    const userId = req.user.id
    const likedPost = await Like.find({owner:userId}).populate("associatedPost")
    return res.status(200).json(new ApiResponse(200, likedPost, "Liked posts fetched successfully."));
})

export {
    likePost,
    getLikes,
    getLikedPostByUser,
    isLiked
}