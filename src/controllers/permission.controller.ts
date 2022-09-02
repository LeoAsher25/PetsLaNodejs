import { Request, Response } from "express";
import prisma from "src/config/prisma/prisma.config";
import { CrudController } from "src/controllers/crud.controller";
import Permission from "src/models/Permission";
import { StatusCodes } from "src/types/status-code.enum";
import { PermissionDto } from "src/types/user.type";

export default class PermissionController extends CrudController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const requestData: PermissionDto = req.body;

      // const newPermission = await prisma.permission.create({
      //   data: requestData,
      // });
      const newPermission = await Permission.create(requestData);
      return res.status(StatusCodes.OK).json(newPermission);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const requestData: PermissionDto = req.body;
      const id = req.params.id

      // const newPermission = await prisma.permission.update({
      //   where: {
      //     id: requestData._id,
      //   },
      //   data: requestData,
      // });
      console.log("params: ", req.params.id);
      const newPermission = await Permission.findOneAndUpdate(
        {
          _id: requestData._id,
        },
        requestData
      );

      return res.status(StatusCodes.OK).json(newPermission);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id: string = req.params.id;

      // await prisma.permission.delete({
      //   where: {
      //     id,
      //   },
      // });
      await Permission.findOneAndDelete({
        _id: id,
      });
      return res.status(StatusCodes.OK).json({
        message: "Delete permission successfully",
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      // const permissions = await prisma.permission.findMany();
      const permissions = await Permission.find();
      return res.status(StatusCodes.OK).json(permissions);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getOne = async (req: Request, res: Response): Promise<Response> => {
    try {
      // const requestData: PermissionDto = req.body;
      const id: string = req.params.id;

      // const permission = await prisma.permission.findFirst({
      //   where: {
      //     id: requestData._id,
      //   },
      // });
      const permission = await Permission.findOne({
        _id: id,
      });

      return res.status(StatusCodes.OK).json(permission);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
}
