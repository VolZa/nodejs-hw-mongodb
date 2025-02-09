import Joi from "joi";
import { CATEGORIES } from "../constants/index.js";
export const updateContactValidationShema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    email: Joi.string().min(3).max(20).email(),
    isFavorite: Joi.boolean(),
    contactType: Joi.string().valid(...CATEGORIES),
});