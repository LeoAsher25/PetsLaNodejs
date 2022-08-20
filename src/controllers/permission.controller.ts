import { Request, Response } from "express";
import { CrudController } from "src/controllers/crud.controller";
import Permission from "src/models/Permission";
import { StatusCodes } from "src/types/status-code.enum";
import { IPermission } from "src/types/user.types";

export default class PermissionController extends CrudController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const requestData: IPermission = req.body;

      const newPermission = await Permission.create(requestData);
      return res.status(StatusCodes.OK).json(newPermission);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const requestData: IPermission = req.body;

      const newPermission = await Permission.findOneAndUpdate(
        requestData
      ).lean();
      return res.status(StatusCodes.OK).json(newPermission);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const requestData: IPermission = req.body;

      const deletedPermission = await Permission.findOneAndDelete(
        requestData
      ).lean();
      return res.status(StatusCodes.OK).json(deletedPermission);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
      const permissions = await Permission.find().lean();
      return res.status(StatusCodes.OK).json(permissions);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getOne = async (req: Request, res: Response): Promise<Response> => {
    try {
      const requestData: IPermission = req.body;
      const permission = await Permission.findOne({
        _id: requestData._id,
      }).lean();

      return res.status(StatusCodes.OK).json(permission);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
}
