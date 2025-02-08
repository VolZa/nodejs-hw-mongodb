import {Router} from 'express';

import { createContactController, delContactByIdController, getContactByIdController, 
        getContactsController, 
        patchContactController, 
        upsertContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.post('/contacts', ctrlWrapper(createContactController));
contactsRouter.delete('/contacts/:contactId', ctrlWrapper(delContactByIdController));
contactsRouter.put('/contacts/:contactId', ctrlWrapper(upsertContactController));
contactsRouter.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

export default contactsRouter;