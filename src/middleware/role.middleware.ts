import { NextFunction, Request, Response } from "express";
import Permission from "src/models/Permission";
import Role from "src/models/Role";
import { StatusCodes } from "src/types/status-code.enum";
import { RoleDto } from "src/types/user.type";

const roleMiddleware = {
  checkRequired: async (req: Request, res: Response, next: NextFunction) => {
    const requestData: RoleDto = req.body;
    if (!requestData.name) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "The role name is required",
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
    const requestData: RoleDto = req.body;
    const role = await Role.findOne({
      name: requestData.name,
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
    const id = req.params.id;
    const role = await Role.findOne({
      _id: id,
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
      const role = await Role.findOne({
        _id: roleId,
      });
      if (!role) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "The role doesn't exists",
        });
      }

      const permission = await Permission.findOne({
        _id: permissionId,
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
      const role = await Role.findOne({
        _id: roleId,
      });
      if (!role) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "The role doesn't exists",
        });
      }

      const permission = await Permission.findOne({
        _id: permissionId,
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
