import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const create = async (data) => {
        console.log("Creating account from signup ...");
        try {
            setLoading(true)
            const userData = await authService.createAccount(data)
            if (userData) {
                setLoading(false)
                navigate("/login")
            }

        } catch (error) {
            console.log("error : ", error);
            setError(error)
        }
    }
    return (
        <section className="bg-gray-900 flex items-center justify-center px-4 my-36 lg:my-10">
            <div className="w-full max-w-md bg-gray-800 bg-opacity-90 shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center text-white">Create an Account</h1>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <form className="space-y-6 mt-6" onSubmit={handleSubmit(create)}>
                    <div>
                        <input
                            placeholder="Enter your full name"
                            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                            {...register("name", { required: true })}
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                            {...register("email", { required: true })}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
                            placeholder="••••••••"
                            {...register("password", { required: true })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-3 text-center transition-all disabled:bg-gray-500"
                        disabled={loading}
                    >
                        {loading ? "submitting..." : "Create an Account"}

                    </button>

                    <p className="text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-400 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </section>

    )
}

export default Signup