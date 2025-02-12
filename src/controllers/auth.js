import { loginUser, logoutUser, registerUser } from "../services/auth.js";
import { serializeUser } from "../utils/serializeUser.js";
import { ONE_DAY } from "../constants/index.js";


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
    const session = await loginUser(req.body);
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY),
    });

    res.json({
        status: 200,
        message: 'Successfully logger in an user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    };
    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};