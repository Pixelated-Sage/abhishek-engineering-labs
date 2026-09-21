import express from "express"
import cors from "cors"
import courseRouter from "./routes/course.route.js"
import errorHandler from "./middleware/errorHandler.js";


const app = express();

function logger (req,res,next){
    console.log(Date(),req.method, req.url);
    next();
}

app.use(cors());
app.use(express.json());
app.use(logger);


app.use("/api",courseRouter);

app.use(errorHandler)

app.listen(3000,() => {
    console.log("Sever is running on http://localhost:3000")
} )