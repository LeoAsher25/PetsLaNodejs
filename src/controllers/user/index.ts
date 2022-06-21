import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import { CrudController } from "src/controllers/CrudController";
import User from "src/models/User";
import { IDeliveryAddress, IUser } from "src/types/userTypes";

export default class UserController extends CrudController {
  public create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    throw new Error("Method not implemented.");
  };
  public read = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      return res.status(200).json(req.user);
    } catch (error) {
      return res.status(400).json(error);
    }
  };
  public update = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const requestData = req.body;
    try {
      const updatedData = await User.findOneAndUpdate(
        {
          _id: requestData._id,
        },
        requestData
      );

      if (!updatedData) {
        return res.status(404).json({
          message: "User _id not found!",
        });
      }

      return res.status(200).json({
        user: updatedData,
      });
    } catch (error) {
      console.log("error: ", error);
      if ((error as mongoose.CastError).name == "CastError") {
        return res.status(404).json({
          message: "User _id not found!",
        });
      }
      return res.status(400).json(error);
    }
  };

  public delete = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    throw new Error("Method not implemented.");
  };

  public getAllAddress = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const user = req.user!;
    try {
      return res.status(200).json((user as IUser).deliveryAddress);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  public addAddress = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData = req.body;
      const user = req.user as IUser;
      const currentAddressList: IDeliveryAddress[] = user.deliveryAddress;
      currentAddressList.unshift({
        ...requestData,
      });

      await User.findOneAndUpdate(
        { _id: user._id },
        { ...user, deliveryAddress: currentAddressList }
      );
      return res.status(200).json({
        message: "Add address successfully!",
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  public deleteAddress = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const _id = req.query._id;
      const user = req.user as IUser;

      const index = user.deliveryAddress.findIndex((add) => add._id == _id);
      if (index < 0) {
        return res.status(404).json({
          message: "Address not found!",
        });
      }

      user.deliveryAddress.splice(index, 1);

      await User.findOneAndUpdate({ _id: user._id }, user);
      return res.status(200).json({
        message: "Delete address successfully!",
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  };
}
