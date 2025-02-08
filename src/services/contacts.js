import { SORT_ORDER } from '../constants/index.js';
import {ContactsCollection} from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filters,
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery =  ContactsCollection.find();
 
    if (filters.contactType) {
        contactsQuery.where("contactType").equals(filters.contactType);
    }

    if (!(filters.isFavourite === undefined)) {
        contactsQuery.where("isFavourite").equals(filters.isFavourite);
    }

    const contactsCount = await ContactsCollection.find()
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

export const delContactById = (contactId) => ContactsCollection.findOneAndDelete({_id: contactId});

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