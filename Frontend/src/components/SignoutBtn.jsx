import React from 'react'
import Button from './Button'
import { useDispatch } from 'react-redux'
import authService from '../backend/auth'
import { logout } from '../store/authSlice'
import { useNavigate } from 'react-router-dom'
function SignoutBtn() {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const signoutHandler = async () => { 
      try {
      const session= await authService.logout()
      if(session){
        dispatch(logout())
        navigate("/")
      } 
      } catch (error) {
        console.log("Error",error);
      }
       /* authService.logout()
        .then(() => {
            dispatch(logout())
            navigate("/")
        })*/

    }
  return (
    <div>
      <Button 
        children='Sign-out' 
        className='transition duration-500 hover:bg-buttons1  py-3 px-6  bg-gray-50 '
        onClick={signoutHandler}
      />
    </div>
  )
}

export default SignoutBtn
