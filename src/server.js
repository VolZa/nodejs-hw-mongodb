import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import router from './routers/index.js';
// import contactsRouter from './routers/contacts.js';

import { getEnv } from './utils/getEnv.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

const PORT = Number(getEnv('PORT', '3000'));

export const startServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

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

  // app.use(contactsRouter);
  app.use(router);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
