import { Router } from "express";
import router from "./routers/course.router.js";


const CourseApi = Router();

CourseApi.use("/courses",router);

export default CourseApi;

