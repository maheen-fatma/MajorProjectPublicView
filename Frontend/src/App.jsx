import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import authService from "./backend/auth"
import { login, logout } from "./store/authSlice"
import {Header, Layout, Logo} from "./components"
import { useSelector } from "react-redux"
function App() {

  //a loading state which would be set false when the user is either fetched or not fetched
  //use loading state to show "Loading..." message while the data is being fetched from appwrite auth service
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.status);

  useEffect(()=>{
    if(!isLogin){
      setTimeout(() => {
        setLoading(false);
      }, 1000); // 3 seconds delay
    } else {
      authService.getLoggedInUser()
      .then( (userInfo) => { // if there is a user then run the login reducer form the store which causes the login status to be true
        
        if(userInfo?.data){
          dispatch(login({userInfo}))
        }
        else {
          dispatch(logout()) //else false the login sttaus
        }
      } )
      .finally( () =>  //finally after all this, set loading as false to stop showing 
      {
        // Introduce a delay before setting loading to false
        setTimeout(() => {
          setLoading(false);
        }, 1000); // 3 seconds delay
      }
      ) }
  },[])
  
  //conditional rendering as per loading
  return !loading ? (
    <div>
      <Layout />
    </div>
  ) : (
    
    <div className="flex items-center justify-center min-h-screen ">
      
    <div className=" animate-zoom-out font-devorana text-customMaroon text-[120px] tracking-wider   ">
      chic
    </div>
  </div>
  )
}

export default App
