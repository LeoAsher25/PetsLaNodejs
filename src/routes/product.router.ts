import express from "express";
import { productController } from "src/controllers";
import checkIdMiddleware from "src/middleware/common/check-id.middleware";
const productRouter = express.Router();

productRouter
  .get("/", productController.getAll)
  .get("/:_id", checkIdMiddleware, productController.getOne)
  .post("/", productController.create)
  .put("/", productController.update)
  .delete("/", productController.delete);

export default productRouter;
