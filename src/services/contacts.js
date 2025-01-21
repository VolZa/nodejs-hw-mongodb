import {ContactsCollection} from '../db/models/Contact.js';

export const getAllContacts = () => ContactsCollection.find();    

// export const getContactById = async (contactId) => {
//     const contact = await ContactsCollection.findById(contactId);
//     return contact;
// };

export const getContactById = (contactId) => ContactsCollection.findById(contactId);