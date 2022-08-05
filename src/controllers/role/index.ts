import { ERole, IRole } from "src/types/userTypes";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CrudController } from "src/controllers/CrudController";
import Role from "src/models/Role";
import { EStatusCodes } from "src/types/statusCode";

export default class RoleController extends CrudController {
  public create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: IRole = req.body;
      const role = await Role.findOne({ name: requestData.name });
      if (role) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The role already exists",
        });
      }
      if (!requestData.name) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The role name is required",
        });
      } else if (
        Object.values(ERole).every((role: string) => role != requestData.name)
      ) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The role name is invalid",
        });
      }

      const newRole = await Role.create(requestData);
      return res.status(EStatusCodes.SUCCESS).json(newRole);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public update = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: IRole = req.body;
      const role = await Role.findOne({ _id: requestData._id });
      if (!role) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The role doesn't exists",
        });
      } else if (role.name === requestData.name) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The role already exists",
        });
      }

      if (!requestData.name) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The role name is required",
        });
      } else if (
        Object.values(ERole).every((role: string) => role != requestData.name)
      ) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The role name is invalid",
        });
      }

      const newRole = await Role.create(requestData);
      return res.status(EStatusCodes.SUCCESS).json(newRole);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public delete = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: IRole = req.body;
      const role = await Role.findOne({ _id: requestData._id });
      if (!role) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The role doesn't exists",
        });
      }

      const deletedRole = await Role.findOneAndDelete(requestData);
      return res.status(EStatusCodes.SUCCESS).json(deletedRole);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getAll = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const roles = await Role.find();
      return res.status(EStatusCodes.SUCCESS).json(roles);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getOne = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: IRole = req.body;
      const role = await Role.findOne({ _id: requestData._id });
      if (!role) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The role doesn't exists",
        });
      }
      return res.status(EStatusCodes.SUCCESS).json(role);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
}
