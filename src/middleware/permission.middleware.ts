import { NextFunction, Request, Response } from "express";
import Permission from "src/models/Permission";
import { StatusCodes } from "src/types/status-code.enum";
import { EPermission, IPermission } from "src/types/user.types";

const permissionMiddleware = {
  checkRequired: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: IPermission = req.body;
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
    const requestData: IPermission = req.body;
    const permission = await Permission.findOne({
      name: requestData.name,
    }).lean();

    if (permission) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "The permission already exists",
      });
    } else {
      next();
    }
  },

  checkNotExist: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: IPermission | string = req.body; // req body may be
    const permission = await Permission.findOne({
      _id: (requestData as IPermission)._id || (requestData as string),
    }).lean();

    if (!permission) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "The permission doesn't exists",
      });
    } else {
      next();
    }
  },

  checkValid: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: IPermission = req.body;
    if (
      Object.values(EPermission).every(
        (permission: string) => permission != requestData.name
      )
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "The permission name is invalid",
      });
    } else {
      next();
    }
  },
};

export default permissionMiddleware;
