import express from "express";
import { productController } from "src/controllers";
const productRouter = express.Router();
 
productRouter
  .get("/", productController.read)
  .post("/", productController.create)
  .put("/", productController.update)
  .delete("/", productController.delete);

export default productRouter;
