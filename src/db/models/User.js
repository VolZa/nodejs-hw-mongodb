import { model, Schema } from "mongoose";

const usersSchema = new Schema({
        name: {type: String, required: true},
        email: {type: String, reqried: true, unique: true},
        password: {type: String, reqried: true},
    }, 
    {timestamps: true, versionKey: false},
);

//Ensures security so that user passwords are not displayed in API responses.
usersSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export const UsersCollection = model('users', usersSchema);