import {Router} from 'express';

import {
        createContactController, delContactByIdController,
        getContactByIdController, 
        getContactsController, 
        patchContactController, 
        upsertContactController} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {validateBody} from '../middlewares/validateBody.js';
import {isValidId} from '../middlewares/isValidId.js';

import { createContactShcema } from '../validation/contacts.js';
import { updateContactValidationShema } from '../validation/updateContactValidationSchema.js';

const contactsRouter = Router();

contactsRouter.get('/', 
        ctrlWrapper(getContactsController));
contactsRouter.get('/:contactId', 
        isValidId, 
        ctrlWrapper(getContactByIdController));
contactsRouter.post('/', 
        validateBody(createContactShcema),
        ctrlWrapper(createContactController));
contactsRouter.delete('/:contactId',
        isValidId,
        ctrlWrapper(delContactByIdController));
contactsRouter.put('/:contactId', 
        isValidId,
        validateBody(updateContactValidationShema),
        ctrlWrapper(upsertContactController));
contactsRouter.patch('/:contactId',
        isValidId,
         validateBody(createContactShcema), 
        ctrlWrapper(patchContactController));

export default contactsRouter;