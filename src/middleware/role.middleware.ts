import { NextFunction, Request, Response } from "express";
import Role from "src/models/Role";
import { EStatusCodes } from "src/types/status-code.enum";
import { ERole, IRole } from "src/types/user.types";

const roleMiddleware = {
  checkRequired: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: IRole = req.body;
    if (!requestData.name) {
      return res.status(EStatusCodes.BAD_REQUEST).json({
        message: "The role name is required",
      });
    } else {
      next();
    }
  },

  checkValid: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: IRole = req.body;
    if (
      Object.values(ERole).every((role: string) => role != requestData.name)
    ) {
      return res.status(EStatusCodes.BAD_REQUEST).json({
        message: "The role name is invalid",
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
    const requestData: IRole = req.body;
    const role = await Role.findOne({
      name: requestData.name,
    }).lean();

    if (role) {
      return res.status(EStatusCodes.CONFLICT).json({
        message: "The role already exists",
      });
    }
  },

  checkNotExist: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: IRole | string = req.body; // req body may be
    const role = await Role.findOne({
      _id: (requestData as IRole)._id || (requestData as string),
    }).lean();

    if (!role) {
      return res.status(EStatusCodes.NOT_FOUND).json({
        message: "The role doesn't exists",
      });
    } else {
      next();
    }
  },
};

export default roleMiddleware;
