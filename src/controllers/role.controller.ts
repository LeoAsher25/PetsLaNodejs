import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import prisma from "src/config/prisma/prisma.config";
import { CrudController } from "src/controllers/crud.controller";
import Role from "src/models/Role";
import roleService from "src/services/role.service";
import { StatusCodes } from "src/types/status-code.enum";
import { PermissionInterface, RoleInterface } from "src/types/user.type";

export default class RoleController extends CrudController {
  public create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: RoleInterface = req.body;
      const newRole = await prisma.role.create({
        data: requestData,
      });
      return res.status(StatusCodes.OK).json(newRole);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public update = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: RoleInterface = req.body;
      const newRole = await prisma.role.update({
        where: { id: requestData._id },
        data: requestData,
      });
      return res.status(StatusCodes.OK).json(newRole);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public delete = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const id: string = req.params.id;
      await prisma.role.delete({
        where: { id },
      });

      return res
        .status(StatusCodes.OK)
        .json({ message: "Delete role successfully" });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getAll = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const roles = await prisma.role.findMany();
      return res.status(StatusCodes.OK).json(roles);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getOne = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData: RoleInterface = req.body;
      const role = await prisma.role.findFirst({
        where: { id: requestData._id },
      });

      return res.status(StatusCodes.OK).json(role);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };

  public addPermission = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const { role, permission } = res.locals;

      const response = await roleService.addPermission(role, permission);

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
}
