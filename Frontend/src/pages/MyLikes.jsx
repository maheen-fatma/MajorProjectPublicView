import React, { useEffect, useState } from 'react'
import { PostPreview } from '../components'
import dbService from '../backend/databases'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'
import InfiniteScroll from 'react-infinite-scroll-component'

function MyLikes() {
  const [posts , setPosts] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loaded, setLoaded] = useState(false) // Track if data has been fetched

  useEffect(()=>{
    loadPosts()      
  },[])

  const loadPosts = () => {
    dbService.getMyLikes()
      .then((newPosts) => {
        setLoaded(true) // Mark as loaded
        if (newPosts.length > 0)
          setPosts((prevPosts) => [...prevPosts, ...newPosts])  
        else
          setHasMore(false) 
      })
  }

  return (
    <div className='px-10 p-[20px]'>
      {loaded && posts.length === 0 ? (
        <p className='text-gray-500 text-center text-lg'>You haven't liked any posts yet.</p>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={loadPosts}
          hasMore={hasMore}
          loader={<h4 className='font-dolce text-2xl tracking-wider'>Loading posts...</h4>}
          endMessage={<p className='text-gray-500 text-center'>No more posts</p>}
        >
          <ResponsiveMasonry columnsCountBreakPoints={{350: 2, 750: 3, 900: 4}}>
            <Masonry gutter="25px">
              {posts.map((item, index) => (
                <div key={index}>
                  <PostPreview {...item.associatedPost} />
                </div>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </InfiniteScroll>
      )}
    </div>
  )
}

export default MyLikes

