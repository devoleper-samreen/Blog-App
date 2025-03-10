import React from 'react'
import { LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authStatus = useSelector(state => state.auth.status)

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
            name: "My Posts",
            slug: "/my-posts",
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
            <nav className="bg-gray-800 border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to='/' className='h-8 font text-3xl'>
                        Blog
                    </Link>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded={isMenuOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            {
                                navItems.map((item) =>
                                    item.active ? (
                                        <li key={item.name} className='block py-2 px-5 text-white rounded-lg bg-transparent'>
                                            <NavLink
                                                to={item.slug}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? 'text-blue-500 font-semibold block py-2 px-5 rounded-lg'
                                                        : 'text-white block py-2 px-5 rounded-lg'
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                        </li>
                                    ) : null

                                )

                            }
                            {
                                //authStatus
                                true && (

                                    <LogoutBtn onClick={() => setIsMenuOpen(false)} />
                                )
                            }

                        </ul>
                    </div>
                </div>
            </nav >
            <hr className="border-gray-500" />
        </>

    )
}

export default Header