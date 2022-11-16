import { NextFunction, Request, Response } from "express";
import Permission from "src/models/Permission";
import { StatusCodes } from "src/types/status-code.enum";
import { PermissionDto } from "src/types/user.type";

const permissionMiddleware = {
  checkRequired: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: PermissionDto = req.body;
    if (!requestData.name) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "The permission name is required",
      });
    } else {
      next();
    }
  },

  checkAlreadyExists: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const requestData: PermissionDto = req.body;

    const permission = await Permission.findOne({
      name: requestData.name,
    });

    if (permission) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "The permission already exists",
      });
    } else {
      next();
    }
  },

  checkNotExist: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: PermissionDto | string = req.body; // req body may be

    const id = req.params.id;
    const permission = await Permission.findOne({
      _id: id,
    });

    if (!permission) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "The permission doesn't exists",
      });
    } else {
      next();
    }
  },
};

export default permissionMiddleware;
