import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Login } from '../index'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authStatus = useSelector(state => state.auth.status)

    const navigate = useNavigate()

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ]
    return (
        <>


            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to='/' className='h-8'>
                        <Logo />
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isMenuOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {
                                navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.name} className='block py-2 px-5 text-white rounded-lg md:bg-transparent'>
                                            <NavLink
                                                to={item.slug}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? 'text-blue-500 font-semibold block py-2 px-5 rounded-lg'
                                                        : 'text-gray-700 dark:text-gray-300 block py-2 px-5 rounded-lg'
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                            {/* <button onClick={() => navigate(item.slug)}>{item.name}</button> */}
                                        </li>
                                    ) : null

                                )

                            }
                            {
                                //authStatus
                                true && (

                                    <LogoutBtn />


                                )
                            }


                        </ul>
                    </div>
                </div>
            </nav >
            <hr className="border-gray-200 dark:border-gray-700" />

        </>

    )
}

export default Header