import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/config"
import { logout } from "../../store/authSlice"
//import { Button } from '@mui/material'

function LogutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(
            () => {
                dispatch(logout())
            }
        )
    }
    return (
        <button onClick={logoutHandler}>Logout</button>
    )
}

export default LogutBtn