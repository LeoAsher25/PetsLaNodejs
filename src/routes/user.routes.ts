import express from "express";
import { userController } from "src/controllers";

const userRouter = express.Router();

userRouter
  .get("/", userController.getAll)
  .get("/address", userController.getAllAddress)
  .post("/address", userController.addAddress)
  .delete("/address", userController.deleteAddress)
  .get('/query', userController.query)

export default userRouter;
