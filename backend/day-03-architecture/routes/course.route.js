import express from "express"
import userController from "../controllers/course.controller.js"

const userRouter = express.Router();

userRouter.get("/courses",  userController.getCourses);
userRouter.post("/courses", userController.postCourses);



export default userRouter;