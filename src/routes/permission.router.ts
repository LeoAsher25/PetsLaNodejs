import express from "express";
import { permissionController } from "src/controllers";
import permissionMiddleware from "src/middleware/permission.middleware";

const permissionRouter = express.Router();

// create permission
permissionRouter.post(
  "/",
  permissionMiddleware.checkRequired,
  // permissionMiddleware.checkValid,
  permissionMiddleware.checkAlreadyExists,
  permissionController.create
);

// get all permission
permissionRouter.get("/", permissionController.getAll);

// get one permission
permissionRouter.get(
  "/:id",
  permissionMiddleware.checkNotExist,
  permissionController.getOne
);

// update permission
permissionRouter.put(
  "/:id",
  permissionMiddleware.checkRequired,
  permissionMiddleware.checkNotExist,
  // permissionMiddleware.checkValid,
  permissionMiddleware.checkAlreadyExists,
  permissionController.update
);

// delete permission
permissionRouter.delete(
  "/:id",
  permissionMiddleware.checkNotExist,
  permissionController.delete
);

export default permissionRouter;
