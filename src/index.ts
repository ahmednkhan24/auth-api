import dotenv from 'dotenv';
import startServer from './server';
import connectToDb from './databases';
import app from './app';

dotenv.config({ path: '.env' });

connectToDb();
startServer(app);
