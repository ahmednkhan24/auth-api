import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from '../routes';

dotenv.config({ path: '.env' });

const app: Application = express();

app.use(express.json());

app.use(routes);

export default app;
