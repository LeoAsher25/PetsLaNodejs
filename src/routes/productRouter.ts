import express from "express";
import { productController } from "src/controllers";
const productRouter = express.Router();

productRouter.get("/", productController.read);
productRouter
  .get("/", productController.read)
  .post("/", productController.create);

export default productRouter;
