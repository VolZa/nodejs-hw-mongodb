import {Router} from 'express';

import { delContactByIdController, getContactByIdController, getContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
contactsRouter.delete('/:contactId', ctrlWrapper(delContactByIdController));

export default contactsRouter;