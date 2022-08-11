import express from "express";
import { roleController } from "src/controllers";
import roleMiddleware from "src/middleware/role.middleware";

const roleRouter = express.Router();

roleRouter.post(
  "/",
  roleMiddleware.checkRequired,
  roleMiddleware.checkValid,
  roleMiddleware.checkAlreadyExists,
  roleController.create
);
roleRouter.get("/", roleController.getAll);
roleRouter.get("/:id", roleMiddleware.checkNotExist, roleController.getOne);
roleRouter.put(
  "/:id",
  roleMiddleware.checkRequired,
  roleMiddleware.checkNotExist,
  roleMiddleware.checkValid,
  roleMiddleware.checkAlreadyExists,
  roleController.create
);
roleRouter.delete("/:id", roleMiddleware.checkNotExist, roleController.delete);

export default roleRouter;
