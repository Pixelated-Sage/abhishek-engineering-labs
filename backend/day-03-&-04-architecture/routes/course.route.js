import express from "express"
import courseController from "../controllers/course.controller.js"

const courseRouter = express.Router();

courseRouter.get("/courses",  courseController.getCourses);
courseRouter.post("/courses", courseController.postCourses);



export default courseRouter;