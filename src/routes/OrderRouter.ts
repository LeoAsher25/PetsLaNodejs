import express from "express";
import { orderController } from "src/controllers";

const orderRouter = express.Router();

orderRouter
  .get("/getAll", orderController.read)
  .post("/create", orderController.create);

export default orderRouter;
