import { model, Schema } from "mongoose";

const usersSchema = new Schema({
        name: {type: String, required: true},
        email: {type: String, reqried: true, unique: true},
        password: {type: String, reqried: true},
    }, 
    {timestamps: true, versionKey: false},
);

export const UsersCollection = model('users', usersSchema);