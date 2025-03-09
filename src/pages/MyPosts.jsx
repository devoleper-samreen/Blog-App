import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/config";

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const user = useSelector(state => state.auth.userData);
    const navigate = useNavigate();
    console.log("user : ", user);


    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchMyPosts = async () => {
            const response = await service.getMyPosts(user.$id); // Service method call
            if (response) {
                setPosts(response.documents);
            }
        };

        fetchMyPosts();
    }, [user, navigate]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Posts</h1>
            {posts.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.$id} className="border p-4 mb-2 rounded">
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p>{post.content.substring(0, 100)}...</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyPosts;
