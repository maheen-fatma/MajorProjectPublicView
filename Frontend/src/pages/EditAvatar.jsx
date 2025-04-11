import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/authSlice'

function EditAvatar() {
    const [avatar, setAvatar] = useState(null)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState(""); // Success message state
    const navigate = useNavigate(); 
    const dispatch = useDispatch()
    const userData = useSelector((state)=>(state.auth.userInfo))
    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]); 
      };
      const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSuccessMessage("");
        alert("This is a demo version of the application.\n\nInteractive features like editing user avatar is disabled.\n\nIf you'd like access to the full version, please contact Maheen Fatma.");

        
      }
  return (
    <div>
      
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {error && <div className='text-red-600'>{error}</div>}
        {successMessage && <div className='text-green-600'>{successMessage}</div>}
        <button 
                className='transition duration-500 hover:bg-buttons1 py-3 px-6 bg-gray-50' 
                onClick={handleSubmit}
        >
                Change Avatar
        </button>
        
    </div>
  )
}

export default EditAvatar
