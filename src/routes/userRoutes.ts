import express from "express";
import { userController } from "src/controllers";

const userRouter = express.Router();

userRouter
  .get("/", userController.read)
  .get("/address", userController.getAllAddress)
  .post("/address", userController.addAddress)
  .delete("/address", userController.deleteAddress);

export default userRouter;
