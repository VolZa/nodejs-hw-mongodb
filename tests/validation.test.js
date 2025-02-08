import { createContactSchema } from "../src/validation/contacts.js";

//for contact validation
const dataToValidate = {
    name: 'Sydir Петрович 23',
    email: 'emka@dot.net',
    phoneNumber:'+38 093 733 1233',
    isFavorite: 'true',
    contactType: 'home'
};

export const validationResult = createContactSchema.validate(dataToValidate, {abortEarly: false});

if (validationResult.error) {
    console.error(validationResult.error.message);
} else {
    console.log('Data is valid!');
}