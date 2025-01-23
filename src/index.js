import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const bootstarp = async () => {
  await initMongoConnection();
  startServer();
};

// Запуск сервера
bootstarp();


