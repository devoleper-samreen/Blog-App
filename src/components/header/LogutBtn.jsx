import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogutBtn() {
    const dispatch = useDispatch()

    // const logoutHandler = () => {
    //     authService.logout().then(
    //         () => {
    //             dispatch(logout())
    //         }
    //     )
    // }

    const logoutHandler = async () => {
        try {
            await authService.logout();
            console.log("logouting...");

            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <button onClick={logoutHandler} className='bg-blue-600 rounded-lg px-6 mt-4 py-3 md:mt-0 md:py-0'>Logout</button>
    )
}

export default LogutBtn