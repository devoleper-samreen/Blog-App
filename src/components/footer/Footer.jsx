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
                            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="https://flowbite.com/" className="hover:underline">Features</a>
                                    </li>
                                    <li>
                                        <a href="https://tailwindcss.com/" className="hover:underline">Pricing</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Support</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Account</a>
                                    </li>
                                    <li>
                                        <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                                    <li className="mb-4">
                                        <a href="#" className="hover:underline">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">Terms &amp; Conditions</a>
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