import express from "express";
import { productController } from "src/controllers";
const productRouter = express.Router();

productRouter.get("/", productController.read);

export default productRouter;
