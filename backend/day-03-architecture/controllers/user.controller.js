import userService from "../services/user.service.js"



const getUser = (req,res) => {
    const userdata = userService.getUser()
    res.status(200).json(userdata);
}

const postUser = (req,res) => {
    const Name = req.body.name;
    console.log(Name)
    if(!Name|| Name.trim()===""){
        res.status(400).json({message:"Kindly fill name"})
    }else{
        const result = userService.postUser(Name);
        if(result.status){
            res.status(201).json({message:"User Created Successfully",user:result.user})
        }else {
            res.status(500).json({message:"Unexpected Error"})
        }
    }
}
export default {getUser,postUser};


