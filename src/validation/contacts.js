import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).pattern(/^['+',0-9,' ']+$/).required(),
    email: Joi.string().min(3).max(20).email(),
    isFavorite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required()
});

