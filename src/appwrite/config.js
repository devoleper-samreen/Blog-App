import { Account, Client, ID, Query, Databases, Storage } from "appwrite";
import conf from "../conf/consf";

export class Service {

    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        // client.setHeaders(
        //     {
        //         'X-Appwrite-Project': '67865825002ff0fda1a4', // Or your appwrite project.
        //         'X-Appwrite-Key': 'standard_09e127d91a99ad233e81f841194d2a149a85be80f56b181c390c5a73ebd29e856c3b3a59d7191ac58a3b8ec3c91e481f879c05473c5afb5d6c77a65ba471d2aa4c1bf2be5bf00e19ba35a3d9b0818a7002657519d82c05a7cbdb1b4bf976a6488e76b0a84cf3f269c76a9b970f91bdc6789079773298cf06fd1fa37b06957ab5' // Or your API Key if that is your prefered method.
        //     }
        // );
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.createDocument(
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
            )

        } catch (error) {
            console.log("appwrite service :: createPost :: error", error);

        }
    }

    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.updateDocument(
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

    async deletePost() {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
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




}

const service = new Service();

export default service;