import userService from "../services/course.service.js"



const getCourses = async (req,res,next) => {
    try{
        const userdata = await userService.getCourses()
        console.log(userdata);
        return res.status(200).json(userdata);
    }catch (error){
        next(error);
    }
}

const postCourses = async (req,res,next) => {
    try{
        const Name = req.body.name;
        const Id = req.body.id;
        console.log(Name)
        if(!Name|| Name.trim()===""){
            return res.status(400).json({message:"Kindly fill name"})
        }
        const result = await userService.postCourses(Id,Name);
        if(result.status){
            return res.status(201).json({message:"Course Created Successfully",user:result.user})
        }else  {
            return next(new Error("Course Creation failed in service"));
        }
    }catch (error) {
        next(error);
    }
}
export default {getCourses,postCourses};


