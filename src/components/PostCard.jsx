import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import parse from "html-react-parser";

function PostCard({ $id, title, content, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block">
            <div className="bg-gray-700 border border-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-[1.05]">
                {/* Image */}
                <img
                    className="w-full h-52 object-cover"
                    src={appwriteService.getFilePreview(featuredImage)}
                    alt={title}
                />

                {/* Content */}
                <div className="p-4">
                    {/* Title */}
                    <h5 className="mb-2 text-lg font-bold text-white truncate">{title}</h5>

                    {/* Description */}
                    <div className="text-gray-400 text-sm line-clamp-2">
                        {parse(content)}
                    </div>

                    {/* Read More Button */}
                    <button className="mt-3 flex items-center gap-2 text-blue-400 hover:text-blue-500 text-sm">
                        Read more
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>
        </Link>

    )
}

export default PostCard