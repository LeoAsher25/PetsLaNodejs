import express from "express";
import { userController } from "src/controllers";

const userRouter = express.Router();

userRouter
  .get("/", userController.getAll)
  .get("/addresses", userController.getAllAddress)
  .post("/addresses", userController.addAddress)
  .delete("/addresses", userController.deleteAddress);

export default userRouter;
