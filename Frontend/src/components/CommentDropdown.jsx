import React from 'react'
import { useState } from "react";
import axios from "axios";
import { FaTrash } from 'react-icons/fa';

const CommentDropdown = ({comments: initialComments=[], postId, postOwnerId})=>{
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([...initialComments])
    const handleCommentSubmit= async () => {
      if(!newComment.trim()) return;
      try { 
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comment`,{
          commentContent: newComment,
        },{
          withCredentials:true
        })
        setComments([...comments, response.data.data]);
        setNewComment("")
      } catch (error) {
        console.error("Error adding comment:", error.response?.data || error.message);
      }
    }
    const handleDeleteComment= async(commentId)=>{
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/${commentId}/delete-comment`,{
          withCredentials: true
        })
        setComments((prevComments) =>
          prevComments.filter((comment) => comment._id !== commentId)
        );
        
      } catch (error) {
        console.error("Error deleting comment:", error.response?.data || error.message);
      }
    }
    
    return (
      
      <div className="absolute left-0 mt-2  bg-white shadow-lg rounded-lg p-3 z-50">
      <div className="flex items-center space-x-2 mb-3">
        <input
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 border rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          Submit
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto space-y-3">
      {comments.length > 0 ? (
        
        comments.map((comment) => (
          <div key={comment._id} className="border-b py-2">
            <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <img src={comment.owner.avatar} alt="hihi" className="w-6 h-6 rounded-full object-cover mr-2" />
              <p className="text-sm font-semibold">{comment.owner.username}</p>
            </div>
            {comment.owner._id === postOwnerId && (
              <button onClick={() => handleDeleteComment(comment._id)} 
                className="text-red-500 hover:text-red-700 ml-auto">
                <FaTrash size={14} />
              </button>
            )}
          </div>
            <p className="text-sm text-gray-600 mt-2">{comment.content}</p>
          </div>
        ) )
      ) : (
        <p className="text-gray-500 text-sm">No comments yet</p>
      )}
      </div>
      </div>
    )
}

export default CommentDropdown
