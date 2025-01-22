import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from "dotenv";
import {getAllContacts, getContactById} from './services/contacts.js';
dotenv.config(); 

const PORT = Number(process.env.PORT) || 3000;
const app = express();

export const startServer = () => {
    app.use(express.json());
    app.use(cors());

    app.use(
        pino({
          transport: {
            target: 'pino-pretty',
            options: {
                colorize: true, // Форматування логів з кольорами
            },
          },
        }),
      );

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello World!',
        });  
    });

    //Реєстрація роута:
    app.get('/contacts', async (req, res) => {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    });

    //Реєстрація роута:
    app.get('/contacts/:contactId', async(req, res) => {
      const {contactId} = req.params;
      const contact = await getContactById(contactId);
      
      if (!contact) {
        res.status(404).json({
          status: 404,
          message: "Contact not found",
        });
        return;
      };
      
      res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact,
      });

    });

    app.use('*', (req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
          message: 'Something went wrong',
          error: err.message,
        });
      });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);

    });

};

export default { app, startServer };


// app.use((req, res, next) => {
//   console.log(`Time: ${new Date().toLocaleString()}`);
//   next();
// });




