import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { login as AuthLogin } from "../store/authSlice"
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async (data) => {
        try {
            console.log("Form Data email:", data.email);
            console.log("Form Data password:", data.password);
            setLoading(true)
            const session = await authService.login(data)
            console.log("Login Response: ", session);

            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) {
                    dispatch(AuthLogin(userData))
                    setLoading(false)
                    navigate("/")
                }
            }

        } catch (error) {
            console.error("Login failed: ", error);
            setError(error?.message)

        }
    }
    return (
        <section className="bg-gray-900 flex items-center justify-center px-4 my-36 lg:my-16">
            <div className="w-full max-w-md bg-gray-800 bg-opacity-90 shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center text-white">Sign in to your account</h1>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <form className="space-y-6 mt-6" onSubmit={handleSubmit(login)}>
                    <div>
                        <input
                            placeholder="Enter your email"
                            type="email"
                            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be valid",
                                },
                            })}
                        />
                    </div>

                    <div>
                        <input
                            placeholder="••••••••"
                            type="password"
                            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                            {...register("password", { required: true })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center transition-all disabled:bg-gray-500"
                        disabled={loading}
                    >
                        {loading ? "submitting..." : "Sign in"}
                    </button>

                    <p className="text-center text-sm text-gray-400">
                        Don’t have an account yet?{" "}
                        <Link to="/signup" className="text-blue-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </section>

    )
}

export default Login