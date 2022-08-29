import { Permission, Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "src/config/prisma/prisma.config";
import { StatusCodes } from "src/types/status-code.enum";
import { ERole, RoleInterface } from "src/types/user.type";

const roleMiddleware = {
  checkRequired: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: RoleInterface = req.body;
    if (!requestData.name) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "The role name is required",
      });
    } else {
      next();
    }
  },

  // checkValid: async (req: Request, res: Response, next: NextFunction) => {
  //   const requestData: RoleInterface = req.body;
  //   if (
  //     Object.values(ERole).every((role: string) => role != requestData.name)
  //   ) {
  //     return res.status(StatusCodes.BAD_REQUEST).json({
  //       message: "The role name is invalid",
  //     });
  //   } else {
  //     next();
  //   }
  // },

  checkAlreadyExists: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const requestData: RoleInterface = req.body;
    const role = await prisma.role.findFirst({
      where: {
        name: requestData.name,
      },
    });

    if (role) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "The role already exists",
      });
    } else {
      next();
    }
  },

  checkNotExist: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: RoleInterface | string = req.body; // req body may be
    const role = await prisma.role.findFirst({
      where: {
        id: (requestData as RoleInterface)._id || (requestData as string),
      },
    });

    if (!role) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "The role doesn't exists",
      });
    } else {
      next();
    }
  },

  async addPermission(req: Request, res: Response, next: NextFunction) {
    try {
      const { roleId, permissionId } = req.body;
      const role: Role | null = await prisma.role.findFirst({
        where: {
          id: roleId,
        },
      });
      if (!role) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "The role doesn't exists",
        });
      }

      const permission: Permission | null = await prisma.permission.findFirst({
        where: {
          id: permissionId,
        },
      });
      if (!permission) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "The permission doesn't exists",
        });
      }

      if (role.permissions.includes(permissionId)) {
        return res.status(StatusCodes.CONFLICT).json({
          message: "The role already has the permission",
        });
      }
      res.locals.role = role;
      res.locals.permission = permission;

      next();
    } catch (err) {
      throw err;
    }
  },

  async removePermission(req: Request, res: Response, next: NextFunction) {
    try {
      const { roleId, permissionId } = req.body;
      const role: Role | null = await prisma.role.findFirst({
        where: {
          id: roleId,
        },
      });
      if (!role) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "The role doesn't exists",
        });
      }

      const permission: Permission | null = await prisma.permission.findFirst({
        where: {
          id: permissionId,
        },
      });
      if (!permission) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "The permission doesn't exists",
        });
      }

      if (role.permissions.includes(permissionId)) {
        return res.status(StatusCodes.CONFLICT).json({
          message: "The role already has the permission",
        });
      }
      res.locals.role = role;
      res.locals.permission = permission;

      next();
    } catch (err) {
      throw err;
    }
  },
};

export default roleMiddleware;
