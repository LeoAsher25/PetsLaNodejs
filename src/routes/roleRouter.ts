import express from "express";
import { roleController } from "src/controllers";

const roleRouter = express.Router();

roleRouter.post("/", roleController.create);
roleRouter.get("/", roleController.getAll);
roleRouter.get("/:id", roleController.getOne);
roleRouter.put("/:id", roleController.create);
roleRouter.delete("/:id", roleController.delete);
