import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import { Home, SignUp, SignIn, AddPost, Post, EditPost, MyPosts, AskAi, MyAcc, EditPassword, EditAvatar, MyLikes, MyComments, UserDetails, SearchPost, FollowingPost } from './pages'


const router = createBrowserRouter(
  createRoutesFromElements(
    //routes go here
    <Route path='/' element = {<App/>}>
      <Route index element = {<Home/>}/>
      <Route path='sign-up' element={<SignUp/>} />
      <Route path='sign-in' element={<SignIn/>} />
      <Route path='add-post' element={<AddPost/>} />
      <Route path='posts/:postId' element={<Post/>} />
      <Route path='edit-post/:postId' element={<EditPost/>} />
      <Route path='my-post' element={<MyPosts/>} />
      <Route path='ask-ai' element={<AskAi/>}/>
      <Route path='my-likes' element={<MyLikes/>}/>
      <Route path='my-comments' element={<MyComments/>}/>
      <Route path='userDetails/:userId' element={<UserDetails/>}/>
      <Route path='search/:searchTerm' element={<SearchPost/>}/>
      <Route path='following-posts' element={<FollowingPost/>}/>
      <Route path='my-account' element={<MyAcc/>}>
        <Route path='edit-password' element={<EditPassword/>} />
        <Route path='edit-avatar' element={<EditAvatar/>} />
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store} >
      <RouterProvider router={router} />
      
    </Provider>
  </React.StrictMode>,
)
