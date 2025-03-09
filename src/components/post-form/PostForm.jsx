import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RTE } from "../../components/index"
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({ post }) {
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active",
            }
        }
    )

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        setLoading(true)

        if (post != undefined) {
            data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deleteFile(post.featuredImage)

            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

            setLoading(false)
        }
        else {
            setLoading(true)
            const file = await appwriteService.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                console.log("userdata : ", userData);


                const newData = { ...data, userId: userData?.$id }
                console.log("new data : ", newData);

                const dbPost = await appwriteService.createPost({
                    ...newData
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)

                }
            }
        }

        setLoading(false)
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return ''
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }

        })

        return () => subscription.unsubscribe()

    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section - Title, Slug, Content */}
            <div className="md:col-span-2">
                <input
                    placeholder="Title"
                    className="w-full mb-4 text-sm font-medium text-white bg-gray-700 py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("title", { required: true })}
                />
                <input
                    placeholder="Slug"
                    className="w-full mb-4 text-sm font-medium text-white bg-gray-700 py-3 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* Right Section - Image, Status, Submit Button */}
            <div className="flex flex-col">
                <input
                    placeholder="Featured Image"
                    type="file"
                    className="w-full mb-4 text-sm font-medium text-white bg-gray-700 py-3 px-6 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg shadow-lg w-full h-auto"
                        />
                    </div>
                )}

                <select
                    className="w-full mb-4 bg-gray-700 text-white text-base py-3 px-4 rounded-md outline-none transition-all focus:ring-2 focus:ring-blue-400"
                    {...register("status", { required: true })}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button
                    type="submit"
                    className={`${post ? "bg-green-500" : "bg-green-700"} w-full rounded p-3 text-white text-base font-semibold hover:opacity-80 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer`}
                    disabled={loading}
                >
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>

    )
}

export default PostForm