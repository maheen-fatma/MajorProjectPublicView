import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { PostPreview } from '../components'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import axios from 'axios';

function SearchPost() {
    const {searchTerm} = useParams();
    const [posts,setPosts] = useState([])
    const getSearchResults = async() => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search/post?query=${searchTerm}`,{withCredentials: true});
            setPosts(response.data.data);
        } catch (error) {
            console.error("Search error:", error);
        }
    }
    useEffect(()=>{
        getSearchResults()
    },[])
    

  return posts.length>0 ? (
    <div className=' px-10 p-[20px] '>

      <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 3, 900: 4}}>
        <Masonry gutter="25px">
      {posts && posts.map((item,index)=>(
        <div key={index} className=' '>
            <PostPreview {...item} />
        </div>
      ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  ) : (
    <div className='p-10 font-dolce text-2xl'>
      No such post exist <br /> Be the first one to post about '{`${searchTerm}`}'
    </div>
  )
}

export default SearchPost
