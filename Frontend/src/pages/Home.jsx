import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AllPosts from './AllPosts'
function Home() {
  const isLoggedIn = useSelector((state)=>(state.auth.status))
  const userData = useSelector((state)=>(state.auth.userInfo))
  return isLoggedIn ?  (
    <div className=' '>
      <AllPosts/>
    </div>
  ) : (
    <div className='p-10 font-dolce text-2xl'>
      Please Sign-in to view posts . . .
    </div>
  )
}

export default Home
