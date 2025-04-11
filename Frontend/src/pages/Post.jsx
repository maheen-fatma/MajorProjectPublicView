import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbService from '../backend/databases';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser'
import axios from 'axios';
import {Button, CommentDropdown, LikesDisplay} from '../components'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
const API_URL = import.meta.env.VITE_BACKEND_URL
function Post() {
   
  const theme = useSelector((state)=>(state.theme.mode))
  
  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(theme)
  },[theme])

  const { postId } = useParams(); //this extracts the 'fromUrl' parameter from the url. This particularly hold the id
  const [post , setPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false)
  const [numOfLikes, setNumOfLikes] = useState(0)
  const [likedUsers, setLikedUsers] = useState([])
  const [numOfComments, setNumOfComments] = useState(0)
  const [comments, setComments] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state)=> state.auth.userInfo)
  //check if the post that is clicked belongs to the person logged in, for this it will check if the post and the userData exist, then also it will check if the userId parameter of the post is the id parameter of the userData
  const isCurrAuthor = post && userData ? post.owner._id === userData._id : false
  const isPostLiked = async ()=>{
    try {
      const response = await axios.get(`${API_URL}/posts/${postId}/liked`,{
          withCredentials: true, 
      });
      return response.data.data; 
    } catch (error) {
      throw error.response?.data || "Could not know if the post is liked or not";
  }
  }

  const getLikeCount = async () => {
    try {
      const response = await axios.post(`${API_URL}/posts/${postId}/likes`, {}, {
        withCredentials: true,
      })
      return response.data.data
    } catch (error) {
      console.error("Error fetching number of likes:", error);
    }
  }

  const getComments = async () => {
    try {
      const response = await axios.post(`${API_URL}/posts/${postId}/comments`, {}, {
        withCredentials: true,
      })
      return response.data.data
    } catch (error) {
      console.error("Error fetching number of likes:", error);
    }
  }

  const likeToggle = async () => {
    try {
      const response = await axios.post(`${API_URL}/posts/${postId}/like`, {}, {
        withCredentials: true, 
    });
    setIsLiked(!isLiked);
    //re render the number of likes, and users liked
    //get the like count and liked users
    try {
      const likeCountAndUsers = await getLikeCount()
      setNumOfLikes(likeCountAndUsers.likeCount)
      setLikedUsers(likeCountAndUsers.users)
    } catch (error) {
      console.error("Error fetching number of likes:", error);
    }
    return response.data
    } catch (error) {
      throw error.response?.data || "Could not liked/unliked the post";
    }
  }

  //to fetch that particular post whenever there is a change in the id parameter fetched from the url 
  useEffect(() => {
    if (postId) {
      dbService.getPost(postId).then(async (post) => {
        if (post) {
          setPost(post);
          //get the like status
          try {
            const likedStatus = await isPostLiked(); 
            setIsLiked(likedStatus); 
          } catch (error) {
            console.error("Error fetching like status:", error);
            setIsLiked(false);
          }

          //get the like count and liked users
          try {
            const likeCountAndUsers = await getLikeCount()
            setNumOfLikes(likeCountAndUsers.likeCount)
            setLikedUsers(likeCountAndUsers.users)
            
          } catch (error) {
            console.error("Error fetching number of likes:", error);
          }

          //get the comment count and coments along with users who commented
          try { 
            const fetchedComments = await getComments()
            setNumOfComments(fetchedComments.commentsCount)
            setComments(fetchedComments.comments)
          } catch (error) {
            console.error("Error fetching comments:", error);
          }
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [postId, navigate]);

  const deletePost = ()=> {
    dbService.deletePost(post._id).then(()=>{
      console.log("Post deleted");
      navigate("/")
    })
  }

  return post ? (
    <div className=' p-10 lg:px-56'>
      <div className=' flex md:flex-row flex-col justify-center dark:bg-gray-800 dark:text-whiteBg dark:shadow-cyan-900 bg-white rounded-3xl shadow-custom  '>
          <div className='md:w-1/2 '>
            <img 
            src={post.imageFile} 
            alt={"Post cant get"} 
            className="rounded-tl-3xl rounded-bl-3xl h-full"
            />
          </div>
          <div className='md:w-1/2 p-5  '>
              <div className='flex justify-end space-x-4'>
                  { isCurrAuthor && ( <>
                  <Button
                  children='Delete'
                  className='  font-dolce tracking-wider rounded-3xl px-5 hover:bg-red-700 '
                  onClick={deletePost}
                  />
                  <Button
                  children='Edit'
                  className=' bg-red-600 text-white font-dolce tracking-wider rounded-3xl px-5 hover:bg-red-700 '
                  onClick={()=>{
                    navigate(`/edit-post/${post._id}`)
                  }}
                  /> </>
                )
                  }
              </div>
              <h1 className=' text-3xl font-dolceBold tracking-wider'>{post.title}</h1>
              <div className=' font-dolce text-sm pt-5 mt-1 '>
                Buy:
                <a 
                  href={post.purchaseLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-dolce text-sm pt-5 underline text-blue-500 ml-1"
                >
                  {new URL(post.purchaseLink).hostname.replace("www.", "").split(".")[0]} 🔗
                </a>
              <div className="flex items-center mt-2">
                <img 
                  src={post.owner.avatar} 
                  alt="User Avatar" 
                  className="w-6 h-6 rounded-full object-cover mr-2" 
                />
                <div >
                <Link to={`/userDetails/${post.owner._id}`} className="text-lg font-dolceBold font-medium text-gray-700 hover:underline hover:text-blue-500 transition duration-200">@{post.owner.username}</Link>
                </div>
              </div>
              </div>
              <div className=' font-dolce text-lg pt-5'>{ post.content ? parse(post.content) : ""}</div>
              {/* Hashtags */}
              <div>
                <div className="flex items-center space-x-4 mt-7">

                  <div className='flex space-x-1'>
                  <button 
                    className={`rounded-full transition ${
                      isLiked ? "text-red-700" : "text-slate-400 hover:text-red-700"
                    }`} 
                    onClick={likeToggle}
                  >
                    {isLiked ? <FaHeart fill="red" size={24} /> : <FaRegHeart size={24} />}
                  </button>
                  <div className="font-dolce text-sm">{numOfLikes}</div>
                  </div>

                  <div className="relative">
                    <div className='flex space-x-1'>
                    <button 
                      className="text-slate-400 hover:text-blue-700 transition"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      <FaRegComment size={24} />
                    </button>
                    <div className="font-dolce text-sm">{numOfComments}</div>
                    </div>
                    {isOpen && <CommentDropdown comments={comments} postId={postId} postOwnerId={post.owner._id} />}
                  </div>

                </div>
                <LikesDisplay likedUsers={likedUsers} />
              </div>

          </div>
      </div>
    </div>
  ) : null
}

export default Post
