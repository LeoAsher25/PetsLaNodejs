import express from "express";
import { permissionController } from "src/controllers";

const permissionRouter = express.Router();

permissionRouter.post("/", permissionController.create);
permissionRouter.get("/", permissionController.getAll);
permissionRouter.get("/:id", permissionController.getOne);
permissionRouter.put("/:id", permissionController.create);
permissionRouter.delete("/:id", permissionController.delete);

export default permissionRouter;
