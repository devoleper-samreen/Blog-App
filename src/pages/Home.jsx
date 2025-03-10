import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components/index"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Scaloton from "../components/Scaloton"

function Home() {
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const user = useSelector(state => state.auth.userData)

    useEffect(() => {
        setLoading(true)
        if (user) {
            appwriteService.getPosts([])
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents)
                    }
                })
        }

        setLoading(false)
    }, [user])

    if (loading) {
        return <Scaloton />
    }

    if (user && posts.length === 0) {
        return (
            <Scaloton />
        )
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center py-40 lg:py-28">
                <h1 className='text-center text-3xl lg:text-4xl font-mono font-bold'>Login to read posts</h1>
                <Link to="/login" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg">Login</Link>
            </div>
        )
    }

    return (
        <div className="w-full py-8 h-fit">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>

    )
}

export default Home