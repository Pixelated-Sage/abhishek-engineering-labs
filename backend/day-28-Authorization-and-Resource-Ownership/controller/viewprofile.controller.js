import viewProfileService from "../services/viewprofile.service.js";

const viewProfileController = async (req, res, next) =>{
    try{
        const {sub} = req.user;
        const result = await viewProfileService(sub);
        res.status(200).json(result);

    }catch (error){
        next(error);
    }
    
}

export default viewProfileController;