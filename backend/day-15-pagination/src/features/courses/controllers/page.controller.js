import pageService from '../services/page.service.js';


const pageController = async (req,res,next) =>{
    try{
        const {page,limit} = req.query;
        if(!(limit <=100 && limit >= 1) || !(page<=100 && page>=1) ){
            throw new Error("Err_vlu Invalid limit or page");
        }

        const result = await pageService(page,limit);
        res.status(200).json(result);
    } catch (error){
        next(error);
    }
    
}

export default pageController;