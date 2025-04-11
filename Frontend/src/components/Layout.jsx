import React, { useEffect } from 'react'
import {Header, Footer} from "./"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Layout() {
  const theme = useSelector((state)=>(state.theme.mode))
  
  useEffect(()=>{
    document.querySelector('html').classList.remove("light","dark")
    document.querySelector('html').classList.add(theme)
  },[theme])
  return (
    <div>
      <div className=" bg-white  flex flex-col min-h-screen dark:bg-gray-800 ">
        <Header/>
        <main className="flex-grow">
        {/* The router outlet or main content goes here */}
        <Outlet />
       </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
