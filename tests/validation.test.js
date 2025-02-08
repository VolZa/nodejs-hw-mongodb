import { createContactShcema } from "../validation/contacts.js";

//for contact validation
const dataToValidate = {
    name: 'Sydir Петрович D',
    email: 'emka@dot.net',
    phoneNumber:'33322233',
    isFavorite: 'true',
    contactType: 'home'
};

export const validationResult = createContactShcema .validate(dataToValidate, {abortEarly: false});

if (validationResult.error) {
    console.error(validationResult.error.message);
} else {
    console.log('Data is valid!');
}