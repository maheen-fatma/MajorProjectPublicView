import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    mode:"light"
}

export const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers: {
        change: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light"; 
            // Using a ternary operator for simplicity
        }
    }
})

export const {change}= themeSlice.actions
export default themeSlice.reducer