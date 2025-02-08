import {Router} from 'express';

import { createContactController, delContactByIdController, getContactByIdController, 
        getContactsController, 
        patchContactController, 
        upsertContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));
contactsRouter.delete('/:contactId', isValidId, ctrlWrapper(delContactByIdController));
contactsRouter.put('/:contactId', isValidId, validateBody(createContactSchema), ctrlWrapper(upsertContactController));
contactsRouter.patch('/:contactId', isValidId, ctrlWrapper(patchContactController));

export default contactsRouter;