import React from "react";

const PostFormSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {/* Left Section */}
            <div className="md:col-span-2">
                <div className="h-10 bg-gray-600 rounded mb-4"></div>
                <div className="h-10 bg-gray-600 rounded mb-4"></div>
                <div className="h-80 bg-gray-600 rounded"></div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col">
                <div className="h-10 bg-gray-600 rounded mb-4"></div>

                {/* Image Preview Skeleton */}
                <div className="w-full h-40 bg-gray-600 rounded mb-4"></div>

                <div className="h-10 bg-gray-600 rounded mb-4"></div>

                <div className="h-10 bg-green-600 rounded"></div>
            </div>
        </div>
    );
};

export default PostFormSkeleton;
