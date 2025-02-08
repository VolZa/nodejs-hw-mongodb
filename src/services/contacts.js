import {ContactsCollection} from '../db/models/Contact.js';

export const getAllContacts = () => ContactsCollection.find();    

// export const getContactById = async (contactId) => {
//     const contact = await ContactsCollection.findById(contactId);
//     return contact;
// };

export const getContactById = (contactId) => ContactsCollection.findById(contactId);

// export const createContact = async (payload) => {
//     const contact = await ContactsCollection.create(payload);
//     return contact;
// };
export const createContact = (payload) => ContactsCollection.create(payload);

export const delContactById = (contactId) => ContactsCollection.findByIdAndDelete(contactId);

export const updateContact = async (contactId, payload, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId },
        payload, 
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );
    if ( !rawResult || !rawResult.value ) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};