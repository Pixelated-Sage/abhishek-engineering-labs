import express from 'express';
import cors from 'cors';
import {z} from 'zod';

const app = express();
let users = [
    {
        name:"abhishek",
        email:"abhishekaj590@gmail.com",
        role:"user"
    },
]
function logger(req,res,next){
    console.log(req.url,req.method);
    next();
}
const apiValidation = z.object({
    name: z.string({
        required_error:"Name is missing completely",
        invalid_type_error:"Name must be a string value"
    }).trim().min(5,"Name cannot be empty or just space"),
    email: z.string({
        required_error:"Email is missing completely"
    }).email("Invalid email format structure"),
    role: z.enum(['user','admin'])
})

app.use(cors());
app.use(express.json())
app.use(logger);


app.get("/health", (req,res) => {
    res.status(200).json({"message":"working"});
})
app.post("/users", (req,res , next)=> {

    //API/DTO layer
    const result = apiValidation.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            success:false,
            "Message":"Your input values are wrong",
            "error":result.error.format()
        });
    }
    let {name , email, role} = result.data;
    console.log(name, email);
    

    // controller / context layer
    if(role === "admin"){
        return res.status(403).json({
            success:false,
            error:"Unauthorized to create admin accounts"
        })
    }


    // service layer 
    if(users.find((user) => (user.name === name && user.email === email ))){
        return res.status(422).json({
            success:false,
            message:"User already exist",
            error:"user exists"
        })
    }


    // DB layer (if in real db the constraints automatically works)
    // const dbError = new Error("DB connection failed");
    // return next(dbError); // this will be handled by the error handler middleware
    users.push({name,email,role})

    return res.status(201).json({
        success:true,
        "message":"user Created successfully"
    });

})

app.use("/", (req,res,next) => {
    res.status(404).json({
        "message":`the requested endpoint [${req.method}] ${req.originalUrl}`,
        success:false,
        error:"Not Found"
    })
})

app.use((err,req,res,next) => {
    // console.log("Internal Crash Logged",err.stack);

    if(res.headersSent){
        return next(err);
    }
    return res.status(500).json({
        success:false,
        error:"Internal server error",
        message:err.message
    })
})

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});