import createHttpError from "http-errors";
import { createContact, delContactById, getContacts, getContactById, updateContact } from "../services/contacts.js";
import { parseFilters } from "../utils/parseFilter.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

export const getContactsController = async (req,res) => {
    const {page, perPage} = parsePaginationParams(req.query);
    const {sortBy, sortOrder} = parseSortParams(req.query);
    const filters = parseFilters(req.query);
    
    const contacts = await getContacts({
        userId: req.user._id,
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
  // checkRight,
export const getContactByIdController = 
    async (req, res, next) => {
        const { contactId } = req.params;
        const userId = req.user._id.toString();
        console.log(`Looking for contact with contactId: ${contactId}`);

        const contact = await getContactById(contactId, userId);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    }


export const createContactController = async (req, res, next) => {
    const contact = await createContact({ ...req.body, userId: req.user._id }) 
    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!', 
        data: contact,
});
};

export const delContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id.toString();

    const result = await delContactById(contactId, userId);
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
    const userId = req.user._id.toString();
    const result = await updateContact(contactId, req.body,  userId, {
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
    const { contactId } = req.params;
    const userId = req.user._id.toString();
    const result = await updateContact(contactId, req.body, userId);

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
