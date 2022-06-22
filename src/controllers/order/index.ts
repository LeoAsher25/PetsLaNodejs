import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Order from "src/models/Order";
import { EOrderStatus, IRequestOrderData } from "src/types/orderType";
import { CrudController } from "../CrudController";

export default class OrderController extends CrudController {
  // create
  public create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const requestData = req.body as IRequestOrderData;
    try {
      if (!requestData.itemList.length) {
        return res.status(400).json({
          message: "Item list mustn't empty!",
        });
      } else if (!requestData.deliveryInfoId) {
        return res.status(400).json({
          message: "Address mustn't empty!",
        });
      }
      const newData = await Order.create({
        ...requestData,
        orderStatus: EOrderStatus.PENDING,
      });
      return res.status(200).json(newData);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  // read
  public read = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const allOrder = await Order.find({});
      return res.status(200).json(allOrder);
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  // update
  public update = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    throw new Error("Method not implemented.");
  };

  // delete
  public delete = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    throw new Error("Method not implemented.");
  };
}
