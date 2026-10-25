import express from 'express';
import cors from 'cors';
import {success, z} from 'zod';

const app = express();
let users = [
    {
        name:"abhishek",
        email:"abhishekaj590@gmail.com"
    },
]
function logger(req,res,next){
    console.log(req.url,req.method);
    next();
}
const apiValidation = z.object({
    name: z.string().min(5,"Name Format is invalid"),
    email: z.string().email("Invalid email format"),
    user: z.enum(['user','admin'])
})

app.use(cors());
app.use(express.json())
app.use(logger);


app.get("/health", (req,res) => {
    res.status(200).json({"message":"working"});
})
app.post("/users", (req,res)=> {

    //API/DTO layer
    const result = apiValidation.safeParse(req.body);
    if(!result.success){
        res.status(400).json({
            success:false,
            "Message":"Your input values are wrong",
            "error":"Invalid Format"
        });
    }
    let {name , email, role} = result;
    console.log(name, email);
    

    // controller / context layer
    if(role === "admin"){
        res.status(403).json({
            success:false,
            error:"Unauthorized to create admin accounts"
        })
    }


    // service layer 



    res.status(201).json({
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
    console.log("Internal Crash Logged",err.stack);
    res.status(500).json({
        success:false,
        error:"Internal server error"
    })
})

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});