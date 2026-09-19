import userService from "../services/user.service.js"



const getUser = (req,res) => {
    try{
        const userdata = userService.getUser()
        return res.status(200).json(userdata);
    }catch (error){
        next(error);
    }
}

const postUser = (req,res,next) => {
    try{
        const Name = req.body.name;
        console.log(Name)
        if(!Name|| Name.trim()===""){
            return res.status(400).json({message:"Kindly fill name"})
        }
        const result = userService.postUser(Name);
        if(result.status){
            return res.status(201).json({message:"User Created Successfully",user:result.user})
        }else  {
            return next(new Error("User registeration failed in service"));
        }
    }catch (error) {
        next(error);
    }
}
export default {getUser,postUser};


