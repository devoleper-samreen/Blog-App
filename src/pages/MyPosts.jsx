import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/index";
import Scaloton from "../components/Scaloton"

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.auth.userData);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const fetchMyPosts = async () => {
            setLoading(true);
            const response = await service.getMyPosts(user.$id);
            if (response) {
                setPosts(response.documents);
            }
            setLoading(false);
        };

        fetchMyPosts();
    }, [user, navigate]);

    if (loading) {
        return <Scaloton />
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <PostCard key={post.$id} {...post} />
                        ))
                    ) : (
                        <h2 className='text-center text-2xl font-bold'>No posts found.</h2>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default MyPosts;

