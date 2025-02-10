import { registerUser } from "../services/auth.js";
import { serializeUser } from "../utils/serializeUser.js";
import { loginUser } from "../services/auth.js";

export const registerUserController = async(req, res) => {
    const { body } = req;
    const user = await registerUser(body);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: serializeUser(user),
    });
};

export const loginUserController = async (req, res) => {
    await loginUser(req.body);
};