import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import prisma from "src/config/prisma/prisma.config";
import { CrudController } from "src/controllers/crud.controller";
import User from "src/models/User";
import { StatusCodes } from "src/types/status-code.enum";
import { AddressDto, UserDto } from "src/types/user.type";

export default class UserController extends CrudController {
  public getAll = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const query = req.query;
      return res.status(StatusCodes.OK).json({ message: "oke" });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
  public getOne = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      return res.status(StatusCodes.OK).json(req.user);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
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
    const id = req.params.id;
    try {
      // const updatedData = await prisma.user.update({
      //   where: {
      //     id: requestData._id,
      //   },
      //   data: requestData,
      // });
      const updatedData = await User.findOneAndUpdate(
        {
          _id: id,
        },
        requestData
      );

      if (!updatedData) {
        return res.status(404).json({
          message: "User _id not found!",
        });
      }

      return res.status(StatusCodes.OK).json({
        user: updatedData,
      });
    } catch (error) {
      console.log("error: ", error);
      if ((error as mongoose.CastError).name == "CastError") {
        return res.status(404).json({
          message: "User _id not found!",
        });
      }
      return res.status(StatusCodes.BAD_REQUEST).json(error);
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
      return res.status(StatusCodes.OK).json((user as UserDto).addresses);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };

  public addAddress = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const requestData = req.body;
      const user = req.user as UserDto;
      const currentAddressList: AddressDto[] = user.addresses;
      currentAddressList.unshift({
        ...requestData,
      });

      // await User.findOneAndUpdate(
      //   { _id: user._id },
      //   { ...user, addresses: currentAddressList }
      // );

      // const updatedUser = await prisma.user.update({
      //   where: {
      //     id: user._id,
      //   },
      //   data: {
      //     addresses: {
      //       create: {
      //         recipient: requestData.recipient,
      //         address: requestData.address,
      //         phoneNumber: requestData.phoneNumber,
      //       },
      //     },
      //   },
      // });
      const updateUser = await User.update(
        {
          _id: user._id,
        },
        [
          ...user.addresses,
          {
            recipient: requestData.recipient,
            address: requestData.address,
            phoneNumber: requestData.phoneNumber,
          },
        ]
      );

      return res.status(StatusCodes.OK).json({
        message: "Add address successfully!",
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };

  public deleteAddress = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const _id = req.query._id;
      const user = req.user as UserDto;

      const index = user.addresses.findIndex((add) => add._id == _id);
      if (index < 0) {
        return res.status(404).json({
          message: "Address not found!",
        });
      }

      user.addresses.splice(index, 1);

      // await User.findOneAndUpdate({ _id: user._id }, user);
      // await prisma.user.update({
      //   where: {
      //     id: user._id,
      //   },
      //   data: user as Prisma.UserUpdateInput,
      // });
      await User.findOneAndUpdate(
        {
          _id: user._id,
        },
        user
      );
      return res.status(StatusCodes.OK).json({
        message: "Delete address successfully!",
      });
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
}
