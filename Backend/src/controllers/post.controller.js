import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { Post } from "../models/post.model.js"
import { Comment } from "../models/comment.model.js"
import {Following} from "../models/following.model.js"
import { Like } from "../models/like.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js";
import { v2 as cloudinary} from 'cloudinary'


/*  TODO
// (done) upload post
// (done) edit post
// (done) view all post / post by specific user
// (done) view specific post by Id
//delete specific post*/

//view all post / posts by giving a specific owner 
const viewPosts = asyncHandler(async(req,res)=>{
    
        const {owner, page =1, limit =15} = req.query // send the _id of the user whose post you like to view OR send no parameter to view all posts
        const query = owner? {owner}: {}
        const posts = await Post.find(query)
        .select("title imageFile")
        .skip((page-1) * limit)
        .limit(Number(limit));
        if(!owner)
            return res.status(200).json(new ApiResponse(200, posts, "All posts viewed successully"))
        else
            return res.status(200).json(new ApiResponse(200, posts, "Posts for the user viewed successully"))
        
})
 
//upload post
const uploadPost = asyncHandler( async (req,res)=>{

    //post uploaded to local file via multer middleware
    
    //take title, content and purchase link
    const {title, content, purchaseLink} = req.body
    if(!title || !content){
        throw new ApiError(400, "Both title and content are necessary fields")
    }
    
    
    const postLocalPath = req.file?.path 
    if(!postLocalPath){
        throw new ApiError(400, "Post required")
    }
    
    const postCloudinary = await uploadOnCloudinary(postLocalPath)

    if(!postCloudinary){
        throw new ApiError (400, "Cannot be uploaded to cloudinary")
    }
    
    const post = await Post.create({
        owner: req.user._id,
        imageFile: postCloudinary.url,
        purchaseLink: purchaseLink.trim(),
        title,
        content
    })

    const createdPost = await Post.findById(post._id)
    if(!createdPost){
        throw new ApiError(400, "New post could not be created")
    }
    
    return res.status(200).json(new ApiResponse(201, createdPost, "Post created successfully"))
})

//edit post- this edits only the title an dthe content of the post and not the image uploaded to it
const editPost = asyncHandler( async (req,res) => {
    const { id } = req.params
    const {title,content, purchaseLink} = req.body

    if (!title && !content) 
        throw new ApiError(400, "Either title or content is required");
    if(title ==="")
        throw new ApiError(400,"Title cannot be empty")
    const post = await Post.findByIdAndUpdate(
        id,
        {title , content , purchaseLink},
        {new: true}
    )
    return res.status(200).json( new ApiResponse(200, post, "Post edited successfully"))
})

//get post by id : view a specific post by id
const getPostById = asyncHandler( async (req,res) => {
    const { id } = req.params
    const post = await Post.findById(id).populate("owner","username avatar")
    if(!post)
        throw new ApiError(404, "Post not found")
    
    return res.status(200).json(new ApiResponse(200, post, "Post found successfully"))
})

//delete a post
const deletePost = asyncHandler( async (req,res)=>{
    const {id} = req.params;
    const post = await Post.findById(id)
    if(!post){
        throw new ApiError(404, "Post not found")
    }
    // Delete all comments associated with this post
    await Comment.deleteMany({ associatedPost: id });

    // Delete all likes associated with this post
    await Like.deleteMany({ associatedPost: id });

    await Post.findByIdAndDelete(id)

    return res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));
})

const getFollowingPosts = asyncHandler(async (req, res) => {
    try {
        
        const userId = req.user._id; // Assuming user ID is available from JWT
        const { page = 1, limit = 15 } = req.query;

        
        // Get the list of users the logged-in user follows
        const following = await Following.find({ follower: userId }).select("followed");
        const followedUsers = following.map(f => f.followed);
        
        if (followedUsers.length === 0) {
            return res.status(200).json({ posts: [], hasMore: false, message: "No posts to show." });
        }

        // Get posts from followed users, sorted by creation time (latest first)
        const posts = await Post.find({ owner: { $in: followedUsers } })
            .sort({ createdAt: -1 }) // Newest posts first
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalPosts = await Post.countDocuments({ owner: { $in: followedUsers } });

        res.status(200).json({
            posts,
            hasMore: totalPosts > page * limit,
            message: "Following posts fetched successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch following posts" });
    }
});

export {
    viewPosts,
    uploadPost,
    editPost,
    getPostById,
    deletePost,
    getFollowingPosts
}