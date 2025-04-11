import React, { useEffect, useState } from 'react';
import { PostPreview } from '../components';
import axios from 'axios';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_BACKEND_URL

function FollowingPost() {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        
        try {
            
            const response = await axios.get(`${API_URL}/posts/following-posts`, {
                params: { page, limit: 15 },
                withCredentials: true
            });
            if (response.data.posts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...response.data.posts]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching following posts:", error);
            setHasMore(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        navigate(`/search/${searchTerm}`);
    };

    return (
        <div className='px-10 p-[20px]'>
            {posts.length === 0 && !hasMore ? (
                <p className='text-center font-dolce text-2xl tracking-wider'>
                    Start following people to get personalized posts.
                </p>
            ) : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={loadPosts}
                    hasMore={hasMore}
                    loader={<h4 className='font-dolce text-2xl tracking-wider'>...</h4>}
                    endMessage={<p></p>}
                >
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
                        <Masonry gutter="25px">
                            {posts.map((item, index) => (
                                <div key={index}>
                                    <PostPreview {...item} />
                                </div>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                </InfiniteScroll>
            )}
        </div>
    );
    
}

export default FollowingPost;
