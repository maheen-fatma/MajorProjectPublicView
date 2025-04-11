import React from 'react'
import SignoutBtn from './SignoutBtn'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useSelector } from 'react-redux';
function NameLogo() {
  const userData = useSelector((state)=>(state.auth.userInfo))
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to close dropdown
  const closeDropdown = () => {
    setIsOpen(false);
  };
  return ( 
    <div>
      <div className="relative inline-block text-left pt-1">
  <div>
    <button type="button" className="inline-flex items-center justify-center w-10 h-10 bg-gray-300 text-customMaroon font-bold text-lg font-dolce rounded-full shadow-md hover:bg-gray-200 transition-colors overflow-hidden" id="menu-button" aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={toggleDropdown}>
       <img 
        src={userData?.avatar || "https://images.app.goo.gl/sBEav9PTRMLRsCpF7"} 
        alt={userData?.fullName || "User Avatar"} 
        className="rw-full h-full  rounded-full object-cover"
    />
    </button>
   
  </div>

  
  {isOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
            <Link
                to="/my-account"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
                onClick={closeDropdown} // Close dropdown on link click
              >
                My Account
              </Link>
              <Link
                to="/add-post"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
                onClick={closeDropdown} // Close dropdown on link click
              >
                New Idea
              </Link>
              <Link
                to="/my-post"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-1"
                onClick={closeDropdown} // Close dropdown on link click
              >
                My Uploads
              </Link>
              <div onClick={closeDropdown}>
                <SignoutBtn />
              </div>
            </div>
          </div>
        )}
</div>

    </div> 
  )
}

export default NameLogo
