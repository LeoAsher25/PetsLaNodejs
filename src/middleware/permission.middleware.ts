import { NextFunction, Request, Response } from "express";
import prisma from "src/config/prisma/prisma.config";
import Permission from "src/models/Permission";
import { StatusCodes } from "src/types/status-code.enum";
import { EPermission, PermissionDto } from "src/types/user.type";

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
    // const permission = await prisma.permission.findFirst({
    //   where: {
    //     name: requestData.name,
    //   },
    // });
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
    // const permission = await prisma.permission.findFirst({
    //   where: {
    //     id: (requestData as PermissionDto)._id || (requestData as string),
    //   },
    // });
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

  // checkValid: async (req: Request, res: Response, next: NextFunction) => {
  //   const requestData: PermissionDto = req.body;
  //   if (
  //     Object.values(EPermission).every(
  //       (permission: string) => permission != requestData.name
  //     )
  //   ) {
  //     return res.status(StatusCodes.BAD_REQUEST).json({
  //       message: "The permission name is invalid",
  //     });
  //   } else {
  //     next();
  //   }
  // },
};

export default permissionMiddleware;
