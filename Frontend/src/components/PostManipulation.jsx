import React, { useCallback, useEffect, useState } from 'react'
import Input from './Input'
import EditorComponent from './EditorComponent'
import dbService from '../backend/databases'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function PostManipulation({post}) {

    
    const userData = useSelector((state)=>(state.auth.userInfo))
    const navigate= useNavigate()
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState("")
    const [title, setTitle] = useState('')
    const [purchaseLink, setPurchaseLink] = useState('')
    const [content, setContent] = useState(post?.content || '');
    const [postImage, setPostImage] = useState('')
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        if (name === "purchaseLink") setPurchaseLink(value);
    };
    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setPostImage(e.target.files[0]);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("title", title);
            formData.append("content", content);
            formData.append("purchaseLink", purchaseLink);
            if (postImage) formData.append("postImage", postImage);
            
            const session = await dbService.newPost(formData)
            setLoading(false)
            if(session){
                console.log(session.message);
                const postId = session.data._id
                navigate(`/posts/${postId}`)
            }
        } catch (error) {
            if(error && error.message){
                setError(error.message || "Failed to create a post")
              } else {
                setError("Something went wrong. Please try again.");
              }
        }

    }
  return loading ? (
    
        <div className=' font-dolce text-2xl tracking-wider' >
            Loading...
        </div>
      
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
            label= "Title: "
            name="title"
            value={title}
            placeholder= "Title"
            onChange={handleInputChange}
            required
            className="mb-1 p-2  rounded-md border  bg-white focus:outline-none focus:ring-1 focus:ring-customMaroon focus:border-transparent focus:shadow-lg "
            overallClassName= " font-dolce ml-4"
        />
        <Input
            label= "Purchase Link: "
            name="purchaseLink"
            value={purchaseLink}
            placeholder= "link"
            onChange={handleInputChange}
            required
            className="mb-1 p-2  rounded-md border  bg-white focus:outline-none focus:ring-1 focus:ring-customMaroon focus:border-transparent focus:shadow-lg "
            overallClassName= " font-dolce ml-4"
        />
        <div className={`p-5 flex ${post ? 'flex-row  space-x-6 ' : 'flex-col space-y-5'} m-10 border border-customMaroon border-solid rounded-2xl`}>

        <div className={` ${post ? 'w-1/2 ' : 'pl-3'}`}>
        <Input
            label= "Add Image: "
            name="postImage"
            type= "file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            overallClassName =' font-dolce'
            onChange={handleFileChange}
            required={!post} // if post is not there i.e if the user is creating a new post then it is a must
        />
        
        {post && (
            <div className=" pt-5">
            <img
                src={dbService.filePreview(post.image)}
                alt={post.title}
                className=" h-[350px] rounded-lg"
            />
            </div>
        )}
        </div>
        <EditorComponent
            lable="Content: "
            name= "content"
            value= {content}
            onChange={(value) => setContent(value)}
            className={` ${post ? 'w-1/2' : ''}`}
        />
        </div>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <Button
        children={post? "Update":"Create Post"}
        type='submit'
        className=' shadow-md border  border-white border-solid hover:border-none  bg-black text-white ml-10 rounded-md font-dolce font-bold hover:shadow-lg '
        />
      </form>
      
    </div>
  )
}

export default PostManipulation
