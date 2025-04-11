import React, { useEffect, useState } from 'react'
import { PostPreview } from '../components'
import dbService from '../backend/databases'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';

function AllPosts() {
    const [posts , setPosts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        navigate(`/search/${searchTerm}`)

    };
    useEffect(()=>{
      loadPosts(page)      
    },[])

    const loadPosts = (currentPage) => {
      dbService.getAllPost(null, currentPage)
        .then((newPosts) => {
          if (newPosts.length > 0){
            setPosts((prevPosts) => [...prevPosts, ...newPosts])  // Directly use the array
            setPage(currentPage+1);  // Increment page after loading posts
          }
          else
            setHasMore(false) // Stop loading when no more posts
  }).catch(() => setHasMore(false));
        
    }
  return (
    <div className=' px-10 p-[20px] '>
      <form onSubmit={handleSearch} className="flex mb-10 font-dolce">
      <button type="submit" className=" bg-customMaroon hover:bg-red-900 text-white p-3 rounded-s-3xl"><FaSearch/></button>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="border p-3 w-full rounded-e-3xl"
            />
            
      </form>
      <InfiniteScroll
                dataLength={posts.length}
                next={() => loadPosts(page)}
                hasMore={hasMore}
                loader={<h4 className=' font-dolce text-2xl tracking-wider'>Loading posts...</h4>}
                endMessage={<p>No more posts</p>}
            >
      <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 3, 900: 4}}>
        <Masonry gutter="25px">
      {posts && posts.map((item,index)=>(
        <div key={index} className=' '>
            <PostPreview {...item} />
        </div>
      ))}
        </Masonry>
      </ResponsiveMasonry>
      </InfiniteScroll>
    </div>
  )
}

export default AllPosts
