import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null);
    const { slug } = useParams();

    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        setLoading(true)
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).finally(() => setLoading(false));
        } else navigate("/");
    }, [slug, navigate]);

    if (loading) {
        return <h1 className='text-center pt-28 text-4xl font-mono font-bold text-white'>Loading...</h1>
    }

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Image Container */}
                <div className="w-full flex justify-center mb-6 relative border border-gray-700 rounded-xl overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="w-full max-h-[450px] object-cover rounded-xl"
                    />

                    {/* Edit & Delete Buttons (Only for Author) */}
                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition">
                                    Edit
                                </button>
                            </Link>
                            <button
                                className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
                                onClick={deletePost}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>

                {/* Post Title */}
                <div className="w-full mb-4 text-center">
                    <h1 className="text-3xl font-bold text-white">{post.title}</h1>
                </div>

                {/* Post Content */}
                <div className="browser-css text-gray-300 text-lg leading-relaxed">
                    {parse(post.content)}
                </div>
            </Container>
        </div>

    ) : null;
}

export default Post