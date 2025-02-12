import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginUserController, registerUserController, logoutUserController } from "../controllers/auth.js";

//'../middlewares/validateBody.js'
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

router.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWrapper(loginUserController),
);

router.post('/refresh-session');
router.post('/logout');

export default router;