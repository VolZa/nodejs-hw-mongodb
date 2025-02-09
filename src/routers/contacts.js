import {Router} from 'express';

import { createContactController, delContactByIdController, getContactByIdController, 
        getContactsController, 
        patchContactController, 
        upsertContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {validateBody} from '../middlewares/validateBody.js';
import {isValidId} from '../middlewares/isValidId.js';

//updateContactSchema 
// import { createContactShcema } from '../validation/contacts.js';
// import { createContactShcema, updateContactSchema } from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', 
        ctrlWrapper(getContactsController));
contactsRouter.get('/contacts/:contactId', 
        isValidId, 
        ctrlWrapper(getContactByIdController));
contactsRouter.post('/contacts', 
        // validateBody(createContactShcema),
        ctrlWrapper(createContactController));
contactsRouter.delete('/contacts/:contactId',
        isValidId,
        ctrlWrapper(delContactByIdController));
contactsRouter.put('/contacts/:contactId', 
        isValidId,
        // validateBody(createContactShcema),
        ctrlWrapper(upsertContactController));
contactsRouter.patch('/contacts/:contactId',
        isValidId,
        // validateBody(updateContactSchema), 
        ctrlWrapper(patchContactController));

export default contactsRouter;