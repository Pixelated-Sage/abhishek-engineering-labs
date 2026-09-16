import express from "express"
import cors from 'cors'


const app = express();
let data = [
    {
        id:1,
        name:"Abhishek"
    }
]
let idcount = 1;
function logger (req,res,next){
    console.log(Date(),req.method, req.url);
    next();
}
app.use(cors());
app.use(express.json());
app.use(logger);



app.get('/' , (req,res) => {
    res.send("Server is running");
})
app.get("/users", (req,res)=>{
    res.status(200).json(data);
})

app.post('/users', (req,res)=>{
    const Name = req.body.name;
    console.log(Name)
    if(!Name && Name.trim()===""){
        res.status(401).send("invalid input")
    }
    const newUser = {
        id: idcount++,
        name:Name 
    }
    data.push(newUser);
    res.status(201).json(newUser)
})

app.listen(3000, ()=>{
    console.log("Server is running on http://localhost:3000")
})
