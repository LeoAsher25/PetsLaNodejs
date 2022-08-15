import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CrudController } from "src/controllers/crud.controller";
import Role from "src/models/Role";
import { EStatusCodes } from "src/types/status-code.enum";
import { IRole } from "src/types/user.types";

export default class RoleController extends CrudController {
  public create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: IRole = req.body;
      const newRole = await Role.create(requestData);
      return res.status(EStatusCodes.OK).json(newRole);
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
      const newRole = await Role.findOneAndUpdate(
        { _id: requestData._id },
        requestData
      ).lean();
      return res.status(EStatusCodes.OK).json(newRole);
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
      const deletedRole = await Role.findOneAndDelete({
        _id: requestData._id,
      }).lean();
      return res.status(EStatusCodes.OK).json(deletedRole);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getAll = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const roles = await Role.find().lean();
      return res.status(EStatusCodes.OK).json(roles);
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
      const role = await Role.findOne({ _id: requestData._id }).lean();
      return res.status(EStatusCodes.OK).json(role);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };

  public assignPermission = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const { roleId, permission } = req.body;
      // const newRole = await Role.create(requestData);
      const response = await Role.findOneAndUpdate(
        { _id: roleId },
        { permission }
      );

      return res.status(EStatusCodes.OK).json({});
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
}
