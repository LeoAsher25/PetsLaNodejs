import express from "express";
import { productController } from "src/controllers";
const productRouter = express.Router();
 
productRouter
  .get("/", productController.getAll)
  .post("/", productController.create)
  .put("/", productController.update)
  .delete("/", productController.delete);

export default productRouter;
