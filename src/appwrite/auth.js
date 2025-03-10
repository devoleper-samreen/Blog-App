import { Account, Client, ID } from "appwrite";
import conf from "../conf/consf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            console.log("Creating account...");
            const userId = ID.unique()

            const userAccount = await this.account.create(userId, email, password, name);
            console.log("userAccount", userAccount);

            if (userAccount) {
                return userAccount
            }
        } catch (error) {
            throw new Error(`Account creation failed: ${error.message}`);
        }
    }

    async login({ email, password }) {
        console.log("Auth Service Login Called with:", email, password)

        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );

        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);

        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("logout successfully!");

        } catch (error) {
            console.log("appwrite service :: logout :: error", error);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log("user : ", user);

            return user

        } catch (error) {
            console.log("appwrite service :: getcurrentuser :: error", error);

        }

        return null;
    }
}

const authService = new AuthService();

export default authService;