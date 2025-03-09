import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const create = async (data) => {
        console.log("Creating account from signup ...");
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                navigate("/login")
            }

        } catch (error) {
            console.log("error : ", error);
            setError(error)
        }
    }
    return (
        <>
            <section className="bg-gray-500">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-gray-700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                                Create an Account
                            </h1>
                            {
                                error && (
                                    <p className='text-red-500 text-center mt-8'>{error}</p>
                                )
                            }
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(create)}>
                                <div>
                                    <input
                                        placeholder="Enter your full name"
                                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        {...register("name", {
                                            required: true
                                        })}

                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Enter your Email"
                                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        {...register("email", {
                                            required: true

                                        })}

                                    />

                                </div>
                                <div>
                                    <input
                                        type="password"
                                        className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="••••••••"
                                        {...register("password", {
                                            required: true,
                                        })}
                                    />
                                </div>

                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600">Create an account</button>
                                <p className="text-center text-sm font-light text-gray-50">
                                    Already have an account?{" "}
                                    <Link to="/login" className="font-medium text-primary-600 hover:underline">
                                        Signin </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup