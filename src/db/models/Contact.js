import { model, Schema } from 'mongoose';
import { CATEGORIES } from '../../constants/index.js';

const contactsSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      required: true,
      // enum: ['work', 'home', 'personal'],
      enum: CATEGORIES,
      default: 'personal',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    photo: { type: String, default: null },
  },
  { timestamps: true, versionKey: false },
);

export const ContactsCollection = model('contact', contactsSchema);
