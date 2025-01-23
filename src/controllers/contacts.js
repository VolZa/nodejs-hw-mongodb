import { delContactById, getAllContacts, getContactById } from "../services/contacts.js";

export const getContactsController = async (req,res) => {
    const contacts = await getAllContacts();
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
        next(new Error('Contact not found !'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const delContactByIdController = async (req, res) => {
    const { contactId } = req.params;

    await delContactById(contactId);

    res.status(204).send();
};