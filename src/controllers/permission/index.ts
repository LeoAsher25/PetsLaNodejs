import { EPermission, IPermission } from "src/types/userTypes";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CrudController } from "src/controllers/CrudController";
import Permission from "src/models/Permission";
import { EStatusCodes } from "src/types/statusCode";

export default class PermissionController extends CrudController {
  public create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: IPermission = req.body;
      const permission = await Permission.findOne({ name: requestData.name });
      if (permission) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The permission already exists",
        });
      }
      if (!requestData.name) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The permission name is required",
        });
      } else if (
        Object.values(EPermission).every(
          (permission: string) => permission != requestData.name
        )
      ) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The permission name is invalid",
        });
      }

      const newPermission = await Permission.create(requestData);
      return res.status(EStatusCodes.SUCCESS).json(newPermission);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public update = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: IPermission = req.body;
      const permission = await Permission.findOne({ _id: requestData._id });
      if (!permission) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The permission doesn't exists",
        });
      } else if (permission.name === requestData.name) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The permission already exists",
        });
      }

      if (!requestData.name) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The permission name is required",
        });
      } else if (
        Object.values(EPermission).every(
          (permission: string) => permission != requestData.name
        )
      ) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The permission name is invalid",
        });
      }

      const newPermission = await Permission.create(requestData);
      return res.status(EStatusCodes.SUCCESS).json(newPermission);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public delete = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: IPermission = req.body;
      const permission = await Permission.findOne({ _id: requestData._id });
      if (!permission) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The permission doesn't exists",
        });
      }

      const deletedPermission = await Permission.findOneAndDelete(requestData);
      return res.status(EStatusCodes.SUCCESS).json(deletedPermission);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getAll = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const permissions = await Permission.find();
      return res.status(EStatusCodes.SUCCESS).json(permissions);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getOne = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: IPermission = req.body;
      const permission = await Permission.findOne({ _id: requestData._id });
      if (!permission) {
        return res.status(EStatusCodes.BAD_REQUEST).json({
          message: "The permission doesn't exists",
        });
      }
      return res.status(EStatusCodes.SUCCESS).json(permission);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
}
