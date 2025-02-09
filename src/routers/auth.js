import { Router } from "express";
import { registerUserSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserController } from "../controllers/auth.js";

//'../middlewares/validateBody.js'
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);

router.post(
    '/login'
);

router.post('/refresh-session');
router.post('/logout');

export default router;