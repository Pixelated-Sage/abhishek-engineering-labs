import express from 'express';
import pageRouter from './routes/page.router.js';

const api = express();


api.use("/page",pageRouter);


export default api;