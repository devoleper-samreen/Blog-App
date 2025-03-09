import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

function LogutBtn() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const logoutHandler = async () => {
        try {
            setLoading(true)
            await authService.logout();
            setLoading(false)
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    return (
        <button
            onClick={logoutHandler}
            className='bg-blue-600 rounded-lg px-6 mt-4 py-3 md:mt-0 md:py-0 disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer'
            disabled={loading}
        >
            {loading ? 'processing...' : 'Logout'}
        </button>
    )
}

export default LogutBtn