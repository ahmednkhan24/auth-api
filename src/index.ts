import dotenv from 'dotenv';
import startServer from './main/server';
import connectToDb from './databases';
import app from './main/app';

dotenv.config({ path: '.env' });

connectToDb();
startServer(app);
