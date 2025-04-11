import { createSlice } from "@reduxjs/toolkit";
//this slice is created to store if there is any user who has logged in or not and if yes, then the details of the user
//this will help give the various accesibility rights to the user who has loggen in
const initialState= {
    status: false,
    userInfo: null
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status= true
            state.userInfo= action.payload
        },
        logout : (state) =>{
            state.status= false
            state.userInfo= null
        }
    }
})

export const {login, logout}= authSlice.actions
export default authSlice.reducer