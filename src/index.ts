import dotenv from 'dotenv';
import app from './main/app';
import startServer from './main/server';
import connectToDb from './databases';

dotenv.config({ path: '.env' });

connectToDb();
startServer(app);
