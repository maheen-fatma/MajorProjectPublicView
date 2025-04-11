import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import SignoutBtn from '../components/SignoutBtn';
import axios from 'axios';
import { login } from '../store/authSlice'
import { Link, Outlet } from 'react-router-dom';
function MyAcc() {
    const dispatch = useDispatch()
    const userData1 = useSelector((state) => state.auth.userInfo, shallowEqual);
    const userData = userData1?.data || userData1;

    const [user, setUser] = useState(null);
    const [isEditable, setIsEditable] = useState(false)
    const [editedData, setEditedData] = useState({ fullName: "", username: "" })

    useEffect(() => {
        if (userData) {
            setUser(userData);
            setEditedData({ fullName: userData.fullName, username: userData.username });
        } 
    }, [userData]);

    const updateInfo = async () => {
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/users/update`,
                editedData,
                {withCredentials:true}
            )

            setUser(response.data.data);
            dispatch(login(response.data.data)); 
            
        } catch (error) {
            throw error.response?.data || "Failed to edit info"
        }
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    const handleEdit = () => {
        if(isEditable){
            updateInfo()
        }
        setIsEditable((prev)=>!prev)
    }

    const handleChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const date = user?.createdAt ? new Date(user.createdAt) : null;
    const datePart = date
    ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : "N/A";

    const timePart = date
    ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
    : "N/A";

    return (
        <div className='p-2 mx-10 font-dolce space-y-5'>
            <div className='text-3xl text-center mb-10'>My Account</div>
            <div className="mt-2">
                <label className="block">Full Name:</label>
                <input
                    type="text"
                    name="fullName"
                    value={editedData.fullName}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`p-1  ${isEditable ? "border-blue-500 border rounded " : "bg-white"} `}
                />
            </div>
            <div className="mt-2">
                <label className="block">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={editedData.username}
                    onChange={handleChange}
                    disabled={!isEditable}
                    className={`p-1  ${isEditable ? "border-blue-500 border rounded " : "bg-white"} `}
                />
            </div>
            <div> email: {user.email}</div>
            <div>Created at: {datePart}, {timePart}</div>
            <div className="flex justify-start gap-4 mt-5">
            <button 
                className='transition duration-500 hover:bg-buttons1 py-3 px-6 bg-gray-50' 
                onClick={handleEdit}
            >
                {isEditable ? "Save" : "Edit"}
            </button>
            <Link 
                to="/my-account/edit-password" 
                className='transition duration-500 hover:bg-buttons1 py-3 px-6 bg-gray-50'
            >
                Edit Password
            </Link>
            <Link 
                to="/my-account/edit-avatar" 
                className='transition duration-500 hover:bg-buttons1 py-3 px-6 bg-gray-50'
            >
                Edit Avatar
            </Link>
            <Link 
                to="/my-likes" 
                className='transition duration-500 hover:bg-buttons1 py-3 px-6 bg-gray-50'
            >
                My Likes
            </Link>
            <Link 
                to="/my-comments" 
                className='transition duration-500 hover:bg-buttons1 py-3 px-6 bg-gray-50'
            >
                My Comments
            </Link>
            <SignoutBtn />
        </div>

        <Outlet />
            
        </div>
    );
}

export default MyAcc;



