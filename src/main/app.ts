import express, { Application } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from '../routes';

dotenv.config({ path: '.env' });

const app: Application = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);

export default app;
