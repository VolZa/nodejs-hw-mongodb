import { initMongoDB } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const bootstarp = async () => {
  await initMongoDB();
  startServer();
};

// Запуск сервера
bootstarp();


