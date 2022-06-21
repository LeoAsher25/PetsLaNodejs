import express from "express";
import { orderController } from "src/controllers";

const orderRouter = express.Router();

orderRouter.get("/", orderController.read).post("/", orderController.create);

export default orderRouter;
