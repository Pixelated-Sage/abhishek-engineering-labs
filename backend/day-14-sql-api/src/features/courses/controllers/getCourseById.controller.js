import courseById from "../services/courseById.service.js";


const getCourseById = async (req, res,next) => {
    try {
        const id = req.params.id;
        const result = await courseById(id);
        res.status(200).json(result);
    }catch(error){
        next(error);
    }
}

export default getCourseById;