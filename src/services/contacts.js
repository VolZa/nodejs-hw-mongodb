import { SORT_ORDER } from '../constants/index.js';
import {ContactsCollection} from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
    userId,
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filters = {},
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery =  ContactsCollection.find( {userId} );
    
    if (filters.contactType) {
        contactsQuery.where("contactType").equals(filters.contactType);
    }

    if (!(filters.isFavourite === undefined)) {
        contactsQuery.where("isFavourite").equals(filters.isFavourite);
    }
    const contactsCount = await ContactsCollection.find({ userId })
        .merge(contactsQuery)
        .countDocuments();
    
    const contacts = await contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({[sortBy]: sortOrder})
        .exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    //  return ContactsCollection.find().merge(contactsQuery).exec();
    return {
        data: contacts,
        ...paginationData,
    };
};    

export const getContactById = async (contactId, userId) => {

    const contact = await ContactsCollection.findOne({ _id: contactId, userId });
    return contact;
};

// export const getContactById = (contactId, userId) => ContactsCollection.findOne(contactId, userId);

// export const createContact = async (payload) => {
//     const contact = await ContactsCollection.create(payload);
//     return contact;
// };
export const createContact = (payload) =>
    ContactsCollection.create(payload);

export const delContactById = (contactId, userId) =>
    ContactsCollection.findOneAndDelete({ _id: contactId, userId });

export const updateContact = async (contactId, payload, userId, options = {}) => {
    const rawResult = await ContactsCollection.findOneAndUpdate(
        { _id: contactId, userId },
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

