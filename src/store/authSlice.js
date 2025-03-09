import { createSlice } from "@reduxjs/toolkit"

const savedAuth = JSON.parse(localStorage.getItem("auth")) || { status: false, userData: null };

const initialState = {
    status: savedAuth.status,
    userData: savedAuth.userData
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
            localStorage.setItem("auth", JSON.stringify(state));
        },
        logout: (state) => {
            state.status = false
            state.userData = null
            localStorage.removeItem("auth");
        }

    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
