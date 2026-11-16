import { Router } from "express";
import viewProfileController from "../controller/viewprofile.controller.js"
const router = Router();

router.get("/me", viewProfileController);


export default router;