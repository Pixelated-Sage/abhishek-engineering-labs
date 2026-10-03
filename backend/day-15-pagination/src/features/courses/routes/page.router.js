import {Router} from 'express';
import pageController from '../controllers/page.controller.js';

const pageRouter = Router();


pageRouter.get("/",(req,res) => {
    res.status(200).json({message:"Page api working"})
})
pageRouter.get("/query",pageController);


export default pageRouter;