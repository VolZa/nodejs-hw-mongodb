import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    loginUserController, registerUserController, logoutUserController,
    refreshUserSessionController
} from "../controllers/auth.js";

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

router.post('/refresh',
    ctrlWrapper(refreshUserSessionController)
);

router.post('/logout',
    ctrlWrapper(logoutUserController)
);

export default router;