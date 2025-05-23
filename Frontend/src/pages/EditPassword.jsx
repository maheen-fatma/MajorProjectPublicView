import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function EditPassword() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState("")
    const [retypePassword, setRetypePassword] = useState("")
    const [successMessage, setSuccessMessage] = useState(""); // Success message state
    const navigate = useNavigate();  

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "oldPassword") setOldPassword(value);
        if (name === "newPassword") setNewPassword(value);
        if (name === "retypePassword") setRetypePassword(value);
    };

    const changePassword = async () => {
       
            alert("🚫 This is a demo version of the application.\n\nInteractive features like changing password is disabled.\n\nIf you'd like access to the full version, please contact Maheen Fatma.");

       
    };

    const changePasswordHandler = () => {
        setError("");
        setSuccessMessage(""); // Clear previous success message
        if (newPassword !== retypePassword) {
            setError("The new passwords do not match. Try again");
        } else {
            changePassword();
        }
    };

    return (
        <div className='space-y-5'>
            <div>
                <label className='mr-2'>Old Password:</label>
                <input type="password" name='oldPassword' placeholder='Old Password' value={oldPassword} onChange={handleChange} />
            </div>
            <div>
                <label className='mr-2'>New Password:</label>
                <input type="password" name='newPassword' placeholder='New Password' value={newPassword} onChange={handleChange} />
            </div>
            <div>
                <label className='mr-2'>Re-type new Password:</label>
                <input type="password" name='retypePassword' placeholder='Re-type new Password' value={retypePassword} onChange={handleChange} />
            </div>
            {error && <div className='text-red-600'>{error}</div>}
            {successMessage && <div className='text-green-600'>{successMessage}</div>} {/* Show success message */}
            <button 
                className='transition duration-500 hover:bg-buttons1 py-3 px-6 bg-gray-50' 
                onClick={changePasswordHandler}
            >
                Change Password
            </button>
        </div>
    );
}

export default EditPassword;
