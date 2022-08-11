import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import { CrudController } from "src/controllers/crud.controller";
import User from "src/models/User";
import { EStatusCodes } from "src/types/status-code.enum";
import { IAddress, IUser } from "src/types/user.types";

export default class UserController extends CrudController {
  public getAll = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const query = req.query;

      return res.status(EStatusCodes.OK).json();
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getOne = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      return res.status(EStatusCodes.OK).json(req.user);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    throw new Error("Method not implemented.");
  };
  public read(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> {
    throw new Error("Method not implemented.");
  }
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

      return res.status(EStatusCodes.OK).json({
        user: updatedData,
      });
    } catch (error) {
      console.log("error: ", error);
      if ((error as mongoose.CastError).name == "CastError") {
        return res.status(404).json({
          message: "User _id not found!",
        });
      }
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
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
      return res.status(EStatusCodes.OK).json((user as IUser).addresses);
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };

  public addAddress = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData = req.body;
      const user = req.user as IUser;
      const currentAddressList: IAddress[] = user.addresses;
      currentAddressList.unshift({
        ...requestData,
      });

      await User.findOneAndUpdate(
        { _id: user._id },
        { ...user, addresses: currentAddressList }
      );
      return res.status(EStatusCodes.OK).json({
        message: "Add address successfully!",
      });
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };

  public deleteAddress = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const _id = req.query._id;
      const user = req.user as IUser;

      const index = user.addresses.findIndex((add) => add._id == _id);
      if (index < 0) {
        return res.status(404).json({
          message: "Address not found!",
        });
      }

      user.addresses.splice(index, 1);

      await User.findOneAndUpdate({ _id: user._id }, user);
      return res.status(EStatusCodes.OK).json({
        message: "Delete address successfully!",
      });
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };
  public query = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestQueries = req.query;
      const page = Number(requestQueries.page) || 0;
      const limit = Number(requestQueries.limit) || 10;

      const query = {
        $match: {
          age: {
            $gt: 20,
          },
          // "addresses.address": "Hà Đông",
        },
      };

      const counter = await User.aggregate([
        query,
        {
          $count: "count",
        },
      ]);

      const response = await User.aggregate([
        query,
        {
          $project: { 
            name: 1,
            addresses: 1,
            age: 1,
          },
        },
        {
          $skip: page * limit,
        },
        {
          $limit: limit,
        },
      ]);
      return res.status(EStatusCodes.OK).json({
        total: counter[0].count,
        userList: response,
      });
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json(error);
    }
  };

  public queryRole = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestQueries = req.query;
      const page = Number(requestQueries.page) || 0;
      const limit = Number(requestQueries.limit) || 10;

      const response = await  User.aggregate([
        {
          $project: {
           
          }
        }
      ])

      return res.status(EStatusCodes.OK).json({});
    } catch (error) {
      return res.status(EStatusCodes.BAD_REQUEST).json();
    }
  };
}
