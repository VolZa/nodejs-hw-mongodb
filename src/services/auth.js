import { UsersCollection } from "../db/models/User.js";

export const registerUser = async(payload) => {
    return await UsersCollection.create(payload);
};