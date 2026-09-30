import coursesByQuery from "../services/coursesByQuery.service.js";


const getCoursesByQuery = async (req,res,next) =>{
    try{
        const {maxStudents}= req.query;
        if(!maxStudents){
            throw new Error(`Err_WrQr Query is wrong kindly check`);
        }
        const result = await coursesByQuery(maxStudents);
        res.status(200).json(result);
    }catch(error){
        next(error);
    }

}

export default getCoursesByQuery;