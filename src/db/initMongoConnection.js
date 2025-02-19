import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection= async () => {
    try {
        const user = env('MONGODB_USER');
        const password = env('MONGODB_PASSWORD');
        const cluster = env('MONGODB_URL');
        const db = env('MONGODB_DB');

        await mongoose.connect(
            `mongodb+srv://${user}:${password}@${cluster}/${db}?retryWrites=true&w=majority&appName=Cluster0`
        );
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.log('Error while setting up mongo connection xx', error);
        throw error;
    }
};