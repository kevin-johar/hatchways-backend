import express from 'express';
import apiRouter from './routes/api.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

export default app;
