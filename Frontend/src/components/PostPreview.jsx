import React from 'react'
import { Link } from 'react-router-dom'
import dbService from '../backend/databases'
function PostPreview({
    _id, //the id will be used to navigate to the entire post
    title="Post title",
    imageFile,
    owner
}) {
  return (
    <Link to={`/posts/${_id}`}> 
        <div className=' relative bg-black rounded-2xl overflow-hidden shadow-md hover:shadow-xl group'>
          <img 
            src={imageFile} 
            alt={title || "post"} 
            className=' w-full h-auto object-cover transition-opacity duration-300 group-hover:opacity-70 '
          />
            <h1 className=' absolute inset-0 opacity-0 group-hover:opacity-100  transition-opacity duration-300 pl-4 p-2 py-4 text-xl text-whiteBg shadow-2xl shadow-black font-bold font-dolceB tracking-wider'>{title}</h1>
            
        </div>
    </Link>
  )
}

export default PostPreview
