import { Client, ID, Query, Databases, Storage } from "appwrite";
import conf from "../conf/consf";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );


        } catch (error) {
            console.log("appwrite service :: createPost :: error", error);

        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )

        } catch (error) {
            console.log("appwrite service :: updatePost :: error", error);

        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            )

            return true

        } catch (error) {
            console.log("appwrite service :: deletePost :: error", error);
            return false

        }
    }

    async getPost(slug) {

        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("appwrite service :: getPost :: error", error);
            return false

        }
    }

    // async getPost(slug) {
    //     try {
    //         const response = await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             [Query.equal("slug", slug)]
    //         );

    //         if (response.documents.length > 0) {
    //             return response.documents[0];
    //         } else {
    //             console.log("No post found with the given slug.");
    //             return false;
    //         }

    //     } catch (error) {
    //         console.log("appwrite service :: getPost :: error", error);
    //         return false;
    //     }
    // }


    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )

        } catch (error) {
            console.log("appwrite service :: getPosts :: error", error);
            return false

        }
    }

    //file upload service
    async uploadFile(file) {
        try {

            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("appwrite service :: uploadFile :: error", error);
            return false


        }
    }

    async deleteFile(fileId) {
        try {

            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return true

        } catch (error) {
            console.log("appwrite service :: deleteFile :: error", error);
            return false


        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    async getMyPosts(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("userId", userId)]
            );
        } catch (error) {
            console.log("appwrite service :: getMyPosts :: error", error);
            return false;
        }
    }


}

const service = new Service();

export default service;