import express from 'express';
import cors from 'cors';
import CourseApi from './features/courses/courses.js';
import errorhandler from "./middleware/errorhandler.js"


const app = express();
const logger = (req,res,next) =>  {
        console.log(req.method, req.url);
        next();
    } 

app.use(cors());
app.use(express.json());
app.use(logger)


app.get("/health", (req,res)=>{
    console.log("api is working")
    res.status(200).json({"message":"backend is working"})
})

app.use("/api",CourseApi);


app.use(errorhandler);


app.listen(3000,()=>{
    console.log("server is running at http://localhost:3000/health");
})