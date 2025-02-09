import { registerUser } from "../services/auth.js";
import { serializeUser } from "../utils/serializeUser.js";

export const registerUserController = async(req, res) => {
    const { body } = req;
    const user = await registerUser(body);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: serializeUser(user),
    });
};