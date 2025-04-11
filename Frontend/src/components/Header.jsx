import React, { useState , useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { Logo, NameLogo } from './index'
import SignoutBtn from './SignoutBtn';
import { useDispatch } from 'react-redux';
import { change } from '../store/themeSlice';
import { FaSun, FaMoon, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
  const isLogin = useSelector((state) => state.auth.status); //this line see the userlogin status
  const [theme , setTheme] = useState("light");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedUser, setSearchedUser] = useState("")
      const handleSearch = async (e) => {
          e.preventDefault();
          if (!searchTerm.trim()) return;
          try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search/user?query=${searchTerm}`,{withCredentials: true});
            const userData = response.data.data;

            if (userData.length > 0) {
              navigate(`/userDetails/${userData[0]._id}`);
            } else {
              setSearchTerm("");
            }

            setSearchedUser(userData);
        } catch (error) {
            console.error("Search error:", error);
        }
        if(searchedUser[0]){
        navigate(`userDetails/${searchedUser[0]._id}`)
      } else {
        setSearchTerm("")
      }
      };
  useEffect(()=>{
    document.querySelector('html').classList.remove('light','dark')
    document.querySelector('html').classList.add(theme)
    
  },[theme])

  const themeChanger = () => {
    if(theme=="light")
      setTheme("dark")
    else
      setTheme("light")
    dispatch(change())
  }
  //items in the header are created as array of objects
  const navItems = [
    {
      name:'Home',
      slug:"/following-posts",
      active: isLogin 
    },{
      name: 'All Posts',
      slug:"/",
      active: true //always visible irrespective of the fact user is logged in or not
    },{
      name:'My Posts',
      slug:"/my-post",
      active: isLogin
    },{
      name:'Add Post',
      slug:"/add-post",
      active: isLogin
    },{
      name:'My Likes',
      slug:"/my-likes",
      active: isLogin
    },{
      name:'My Comments',
      slug:"/my-comments",
      active: isLogin
    },{
      name:'Sign-In',
      slug:"/sign-in",
      active: !isLogin //show this only when the user is not loggen in
    },{
      name:'Sign-Up',
      slug:"/sign-up",
      active: !isLogin
    }
  ]
  return (
    <header className="   text-customMaroon dark:bg-gray-800 dark:text-whiteBg  ">
      <div className=' text-center py-2 lg:py-2'>
        <Logo/>
      </div>
      
      <div className="">
        <ul className='flex ml-auto justify-center md:justify-end font-dolce tracking-wider mb-5'>
          {
            navItems.map((item)=>
              item.active ? (
                <NavLink key={item.name} to={item.slug} className={({isActive})=>`rounded-3xl py-1 ml-1  ${isActive? "bg-black text-white":"transition duration-500 dark:hover:bg-gray-900 hover:bg-buttons1 hover:bg-opacity-50"}`}>
                <li 
                    className='py-2 px-6 '
                >
                 
                  {item.name}
                 
                </li>
                </NavLink>
              ) : null
            )
          }
          
        <NavLink to='/ask-ai' className={({isActive})=>`rounded-3xl py-1 mx-1   ${isActive? "bg-black text-white":"transition duration-500 dark:hover:bg-gray-900 hover:bg-buttons1 hover:bg-opacity-50"}`}>
          <li 
              className='py-2 px-6 '
          >
            Ask AI
          </li>
        </NavLink>
        {isLogin && <form 
            onSubmit={handleSearch} 
            className="flex items-center border border-gray dark:border-whiteBg rounded-3xl overflow-hidden bg-white dark:bg-gray-800 px-4 mr-2"
        >
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search username..."
                className=" w-48 md:w-60 bg-transparent text-customMaroon dark:text-whiteBg outline-none"
            />
            <button 
                type="submit" 
                className=" text-gray-500 dark:text-white rounded-e-3xl hover:bg-opacity-80"
            >
                <FaSearch />
            </button>
        </form>}

        {
          isLogin && 
          
          <NameLogo/>
        }
        <button onClick={themeChanger} className='mx-5'>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
        </ul>
      </div>
    </header>
  )
}

export default Header
