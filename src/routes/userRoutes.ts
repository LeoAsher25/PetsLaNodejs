import express from "express";
import { userController } from "src/controllers";

const userRouter = express.Router();

userRouter.get("/", userController.read);

export default userRouter;
