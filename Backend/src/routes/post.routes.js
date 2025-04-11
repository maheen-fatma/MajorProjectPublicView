import { Router } from "express";
import { deletePost, editPost, getFollowingPosts, getPostById, uploadPost, viewPosts } from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {upload} from "../middleware/multer.middleware.js"
import { getLikes, isLiked, likePost } from "../controllers/like.controller.js";
import { addComment, deleteComment, getAllComments } from "../controllers/comment.controller.js";
const router = Router()
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/view-posts").get(viewPosts)
router.route("/following-posts").get(getFollowingPosts)
router.route("/upload-post").post(upload.single('postImage'),uploadPost)
router.route("/:id").get(getPostById)
router.route("/:id/edit-post").patch(editPost)
router.route("/:id/delete-post").delete(deletePost)
router.route("/:id/liked").get(isLiked)
router.route("/:id/like").post(likePost) //this likes the post if not liked before. and unlikes if liked already
router.route("/:id/comment").post(addComment) // adds a comment to the post
router.route("/:id/:commentId/delete-comment").delete(deleteComment)
router.route("/:id/likes").post(getLikes) // users who liked the post along with the total count of likes
router.route("/:id/comments").post(getAllComments)//get comments for a particular post

export default router