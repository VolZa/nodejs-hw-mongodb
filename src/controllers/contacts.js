import createHttpError from "http-errors";
import { createContact, delContactById, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import { parseFilters } from "../utils/parseFilter.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

export const getContactsController = async (req,res) => {
    const {page, perPage} = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query);
    const filters = parseFilters(req.query);
    
    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filters,
    });
 
    res.json({
        staus: 200,
        message: 'Successfuly found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const {contactId} = req.params;
    const contact = await getContactById(contactId);

    // if (!contact) {
    //     res.status(404).json({
    //         message: 'Contact not found'
    //     });
    //     return;
    // }

    if (!contact) {
        // next(new Error('Contact not found !'));
        // return;
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactController = async (req, res, next) => {
    // try {
    //     const {error} = createContactSchema.validate(req.body, {abortEarly: false});
    //     if (error) {
    //         return res.status(400).json({meage: error.details.map(err => err.message)});
    //     }

    //     const contact = await createContact(req.body);
  
    //     res.status(201).json({
    //         status: 201,
    //         message: 'Successfully created a contact!', 
    //         data: contact,
    // });
    // } catch (err) {
    //     next(err);
    // }
    const contact = await createContact(req.body);
  
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!', 
        data: contact,
});
};

export const delContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;

    const result = await delContactById(contactId);
    if (!result) {
        next(createHttpError(404,  'Contact not found'));       
        return;
    }
    // res.status(204).send();
    // res.status(204).end();
    res.sendStatus(204);
};

export const upsertContactController = async ( req, res, next ) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body, {
        upsert: true,
    });
    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    const status = result.isNew ? 201 : 200;

    res.status(status).json({
        status,
        message: `Successfully upserted a contact!`,
        data: result.contact,
    });
};    

export const patchContactController = async (req, res, next) => {
    const {contactId} = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }
    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.contact,
    });
};