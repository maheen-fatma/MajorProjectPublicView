import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'

function MyComments() {
    const [comments, setComments] = useState([])

    useEffect(() => {
        loadComments()
    }, [])

    const loadComments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/my-comments`, {
                withCredentials: true
            })
            setComments(response.data.data)
        } catch (error) {
            console.error("Error fetching comments:", error.response?.data || error.message)
        }
    }

    const handleDeleteComment = async (commentId, postId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/${commentId}/delete-comment`, {
                withCredentials: true
            })
            setComments((prevComments) =>
                prevComments.filter((comment) => comment._id !== commentId)
            )
        } catch (error) {
            console.error("Error deleting comment:", error.response?.data || error.message)
        }
    }

    return (
        <div className="px-10 p-[20px] flex flex-col items-start h-screen">
            <h2 className="text-lg font-bold mb-4">My Comments</h2>
            <div className="w-full max-w-2xl overflow-y-auto max-h-[80vh] pr-2">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="flex items-start space-x-3 mb-4 w-full">
                            <div className="w-12 h-12 shrink-0">
                                <img
                                    src={comment.associatedPost.imageFile}
                                    alt="Post"
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                            <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                      
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={comment.owner.avatar}
                                            alt="Avatar"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <p className="text-sm font-semibold">{comment.owner.username}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteComment(comment._id, comment.associatedPost._id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>

                                {/* Comment Content */}
                                <p className="mt-2 text-gray-800 dark:text-gray-200">{comment.content}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No comments found.</p>
                )}
            </div>
        </div>
    )
}

export default MyComments
