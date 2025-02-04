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
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                //call another method
                return this.login({ email, password });
            }
            else {
                return userAccount;
            }


        } catch (error) {
            throw new Error(`Account creation failed: ${error.message}`);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createSession(email, password)

        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);

        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();

        } catch (error) {
            console.log("appwrite service :: getcurrentuser :: error", error);

        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite service :: logout :: error", error);
        }
    }

}

const authService = new AuthService();

export default authService;