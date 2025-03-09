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

    const login = async (data) => {
        try {
            console.log("Form Data email:", data.email);
            console.log("Form Data password:", data.password);
            const session = await authService.login(data)
            console.log("Login Response: ", session);

            if (session) {
                const userData = await authService.getCurrentUser()

                if (userData) {
                    dispatch(AuthLogin(userData))
                    navigate("/")
                }
            }

        } catch (error) {
            console.error("Login failed: ", error);
            setError(error?.message)

        }
    }
    return (
        <>
            <section className="bg-gray-500">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                                Sign in to your account
                            </h1>
                            {
                                error && (
                                    <p className='text-red-600 text-center mt-8'>{error}</p>
                                )
                            }
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(login)}>
                                <div>
                                    <input
                                        placeholder="Enter your email"
                                        type="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-lg"
                                        {...register("email", {
                                            required: true,
                                            validate: {
                                                matchPattern: (value) =>
                                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be valid",

                                            }
                                        })}
                                    />
                                </div>
                                <div>
                                    <input
                                        placeholder="••••••••"
                                        type="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-lg"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                </div>

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600">Sign in</button>
                                <p className="text-center text-sm font-light text-white">
                                    Don’t have an account yet?{" "}
                                    <Link to="/signup" className="font-medium text-primary-600 hover:underline">
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login