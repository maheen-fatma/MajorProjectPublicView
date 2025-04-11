import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";

//addComment to a post (req.user and postId from params)
// /posts/:id/comment
const addComment = asyncHandler(async(req,res)=>{ 
    const { id } = req.params // get the id of the post on which the comment is to be made from the params
    const userId = req.user._id //id of the user who is making the comments
    const {commentContent} = req.body //send the comment body from the form
    if(!id)
        throw new ApiError(400, "No post found. Correct post id required")
    
    const post = await Post.findById(id)
    
    if(!post)
        throw new ApiError(404, "Post not found")
    
    let comment = await Comment.create({
        owner: userId,
        associatedPost: id,
        content: commentContent
    });
    comment = await comment.populate("owner", "username avatar");
    return res.status(201).json(new ApiResponse(201, comment, "Commented successfully"));
})

//getAllComments for a post (postId from params) along with the number of comments
// /posts/:id/comments
const getAllComments = asyncHandler(async(req,res)=>{
    const {id} = req.params 
    if(!id)
        throw new ApiError(400, "Post id is required as a params")

    const comments = await Comment.find({associatedPost:id}).populate("owner","username avatar")
    const commentsCount = comments.length
    return res.status(200).json(new ApiResponse(200, { commentsCount, comments }, "Comments fetched successfully."));
})

//getMyComments - to get the posts which i have commented on along with the contents
// /users/my-comments
const getMyComments = asyncHandler (async (req,res)=>{
    const userId = req.user._id
    const commentedPosts = await Comment.find({owner:userId}).populate("associatedPost", "imageFile").populate("owner","avatar username")
    return res.status(200).json(new ApiResponse(200, commentedPosts, "Commented posts, along with comments, fetched successfully."));
})

//"posts/:id/:commentId/delete-comment"
//.delete
const deleteComment = asyncHandler (async(req,res)=>{
    const {commentId} = req.params;
    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404, "Comment not found")
    }
    await Comment.findByIdAndDelete(commentId)

    return res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
})

export {
    addComment,
    getAllComments,
    getMyComments,
    deleteComment
}