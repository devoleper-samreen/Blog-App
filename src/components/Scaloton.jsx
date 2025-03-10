import React from "react";

const SkeletonLoader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(9).fill(0).map((_, index) => (
                <div key={index} className="bg-gray-700 border border-gray-700 rounded-lg shadow-lg overflow-hidden animate-pulse">
                    {/* Image Skeleton */}
                    <div className="w-full h-52 bg-gray-600"></div>

                    {/* Content Skeleton */}
                    <div className="p-4">
                        {/* Title Skeleton */}
                        <div className="mb-2 h-6 bg-gray-500 rounded w-3/4"></div>

                        {/* Description Skeleton */}
                        <div className="h-4 bg-gray-500 rounded w-full mb-1"></div>
                        <div className="h-4 bg-gray-500 rounded w-5/6"></div>

                        {/* Read More Button Skeleton */}
                        <div className="mt-3 h-5 bg-gray-500 rounded w-1/3"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
