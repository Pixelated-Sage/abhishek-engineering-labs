import express from 'express';
import cors from 'cors';

import errorHandler from './middlewares/errorHandler.js';
import accountRouter from "./routers/account.route.js"

const app = express()

app.use(cors());
app.use(express.json());
app.use("/api/account",accountRouter);

app.get('/', (req,res) => {
    res.json({message:"Server is running"})
})
app.use((req, res, next) => {
  console.log(`⚠️ Unhandled request intercepted: [${req.method}] ${req.originalUrl}`);
  
  return res.status(404).json({
    error: 'Not Found',
    message: `The requested endpoint [${req.method}] ${req.originalUrl} does not exist on this server.`,
    hint: 'Please check your route spelling or verify your base prefix (e.g., /api/bank/transfer)'
  });
});

app.use(errorHandler);



app.listen(3000, ()=>{
    console.log("Server is running at http://localhost:3000/")
})
