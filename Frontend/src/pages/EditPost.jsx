import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbService from '../backend/databases';
import Input from '../components/Input';
import EditorComponent from '../components/EditorComponent';
import Button from '../components/Button';
function EditPost() {
    const {postId} = useParams();
    const [post, setPost] = useState();
    const navigate = useNavigate()
    const [loading , setLoading] = useState(false)
    const [error, setError] = useState("")
    const [title, setTitle] = useState(post? post.title :'')
    const [purchaseLink, setPurchaseLink] = useState(post? post.purchaseLink:'')
    const [content, setContent] = useState(post? post.content : '');

    useEffect(()=>{
        if(postId){
            dbService.getPost(postId).then((post)=>{
              if(post)
                setPost(post)
            })
        } else {
            navigate("/")
        }
    },[postId, navigate])
    useEffect(() => {
      if (post) {
          setTitle(post.title || '');
          setPurchaseLink(post.purchaseLink || '');
          setContent(post.content || '');
      }
  }, [post]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      if (name === "title") setTitle(value);
      if (name === "purchaseLink") setPurchaseLink(value);
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault()
    setError("")
    setLoading(true)
    
    try {
        const session = await dbService.editPost(postId, {title, content, purchaseLink})
        setLoading(false)
        if(session){
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
  return post ? (
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
        
        {post && (
            <div className=" pt-5">
            <img
                src={post?.imageFile}
                alt={post?.title}
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
  ) : null
}

export default EditPost
