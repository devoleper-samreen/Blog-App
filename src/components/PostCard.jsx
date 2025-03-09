import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import parse from "html-react-parser";

function PostCard({ $id, title, content, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="max-w-md max-h-[290px] min-h-[290px] bg-gray-700 border border-gray-200 rounded-lg shadow">
                <img className="rounded-t-lg w-full h-full object-cover" src={appwriteService.getFilePreview(featuredImage)} alt={title} />
                <div className="px-5 pt-3">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-base align-bottom">{parse(content)}</div>
                    {/* <button className="inline-flex items-center px-3 py-1 text-[12px] font-normal text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button> */}
                </div>
            </div>

        </Link>
    )
}

export default PostCard