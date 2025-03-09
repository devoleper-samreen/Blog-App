import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RTE } from "../../components/index"
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PostForm({ post }) {

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
        }
        else {
            const file = await appwriteService.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId

                const newData = { ...data, userId: userData?.userData.$id }
                console.log("new data : ", newData);

                const dbPost = await appwriteService.createPost({
                    ...newData
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)

                }
            }
        }
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
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <input
                    placeholder="Title"
                    className="block mb-4 text-sm font-medium text-gray-700 bg-gray-500 py-3 px-6 rounded"
                    {...register("title", { required: true })}
                />
                <input
                    placeholder="Slug"
                    className="block mb-4 text-sm font-medium text-gray-700 bg-gray-500 py-3 px-6 rounded"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <input
                    placeholder='Featured Image'
                    type="file"
                    className="block mb-4 text-sm font-medium text-gray-700 bg-gray-500 py-3 px-6 rounded"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <select
                    className="mb-4 bg-gray-500 text-white text-base py-3 px-10 rounded-md outline-none  transition-all"
                    {...register("status", { required: true })}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>

                <button type="submit" className={`${post ? "bg-green-500" : ""} w-full bg-green-700 rounded p-3 text-base`}>
                    {post ? "Update" : "Submit"}
                </button>

            </div>
        </form>
    )
}

export default PostForm