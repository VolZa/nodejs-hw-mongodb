import mongoose from 'mongoose';
import { getEnv } from '../utils/getEnv.js';

export const initMongoConnection= async () => {
    try {
        const user = getEnv('MONGODB_USER');
        const password = getEnv('MONGODB_PASSWORD');
        const cluster = getEnv('MONGODB_URL');
        const db = getEnv('MONGODB_DB');

        await mongoose.connect(
            `mongodb+srv://${user}:${password}@${cluster}/${db}?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.log('Error while setting up mongo connection', error);
        throw error;
    }
};