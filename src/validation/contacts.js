import Joi from 'joi';

export const createContactShcema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(20).email(),
    isFavorite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required()
});



//for contact validation
const dataToValidate = {
    name: 'Sydir Петрович D',
    email: 'emka@dot.net',
    phoneNumber:'33322233',
    isFavorite: 'true',
    contactType: 'home'
};

export const validationResult = createContactShcema.validate(dataToValidate, {abortEarly: false},);

if (validationResult.error) {
    console.error(validationResult.error.message);
} else {
    console.log('Data is valid!');
}