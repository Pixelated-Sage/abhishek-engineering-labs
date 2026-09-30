import courses from "../services/courses.service.js";

const getCourses = async (req, res,next) => {
    try {
        const result = await courses()
        res.status(200).json(result);
    }
    catch (error){
        next(error);
    }
    

}

export default getCourses;