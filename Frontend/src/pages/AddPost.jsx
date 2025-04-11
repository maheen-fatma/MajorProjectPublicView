import React from 'react'
import { useEffect } from 'react'
import { PostManipulation } from '../components'
import { useSelector } from 'react-redux'
function AddPost() {
  const theme = useSelector((state)=>(state.theme.mode))
  
  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(theme)
  },[theme])
  return (
    <div className=' dark:text-whiteBg'>
      <PostManipulation/>
    </div>
  )
}

export default AddPost
