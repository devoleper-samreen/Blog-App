import React from "react";
import { Container } from "../components/index";

const PostSkeleton = () => {
    return (
        <div className="py-8">
            <Container>
                {/* Image Skeleton */}
                <div className="w-full flex justify-center mb-6 relative border border-gray-700 rounded-xl overflow-hidden animate-pulse">
                    <div className="w-full h-[300px] bg-gray-600 rounded-xl"></div>
                </div>

                {/* Title Skeleton */}
                <div className="w-full mb-4 text-center">
                    <div className="h-8 bg-gray-500 rounded w-2/3 mx-auto"></div>
                </div>

                {/* Content Skeleton */}
                <div className="space-y-3">
                    {Array(6).fill(0).map((_, index) => (
                        <div key={index} className="h-4 bg-gray-500 rounded w-full"></div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default PostSkeleton;
