import express from 'express'
import cors from 'cors'

import Course from "./features/courses/courses.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

function logger(req,res,next){
    console.log(req.method,req.url);
    next();
}

app.use(cors());
app.use(express.json());
app.use(logger);


app.use("/api/course",Course);


app.use(errorHandler);



app.listen(3000,()=>{
    console.log("Server is running at http://localhost:3000");
})