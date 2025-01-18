import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from "../index"

function Footer() {
    return (
        <>
            <hr className="border-gray-200 dark:border-gray-700" />
            <footer className="bg-white mt-2 dark:bg-gray-900">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <Logo width="130px" />
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <Link className="hover:underline">Features</Link>
                                    </li>
                                    <li>
                                        <Link className="hover:underline">Pricing</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Support</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <Link className="hover:underline ">Account</Link>
                                    </li>
                                    <li>
                                        <Link className="hover:underline">Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <Link className="hover:underline">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link className="hover:underline">Terms &amp; Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" /> */}

                </div>
            </footer>

        </>
    )
}

export default Footer