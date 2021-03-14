import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from '../routes';

dotenv.config({ path: '.env' });

const app: Application = express();

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies

app.use(routes);

export default app;
