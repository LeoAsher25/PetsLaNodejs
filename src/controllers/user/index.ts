import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import { CrudController } from "src/controllers/CrudController";
import User from "src/models/User";

export default class UserController extends CrudController {
  public create(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
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

  public delete(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
}
