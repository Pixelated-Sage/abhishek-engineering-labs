import express from "express"
import userController from "../controllers/user.controller.js"

const userRouter = express.Router();

userRouter.get("/user",  userController.getUser);
userRouter.post("/user", userController.postUser);



export default userRouter;