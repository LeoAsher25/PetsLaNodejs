import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import Product from "src/models/Product";
import { CrudController } from "../CrudController";

export default class ProductController extends CrudController {
  public create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const requestData = req.body;
    try {
      const newProduct = await Product.create(requestData);

      return res.status(200).json({
        product: newProduct,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  };
  public read = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const allProduct = await Product.find({});
      return res.status(200).json({
        products: allProduct,
      });
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
      const updatedData = await Product.findOneAndUpdate(
        {
          _id: requestData._id,
        },
        requestData
      );

      if (!updatedData) {
        return res.status(404).json({
          message: "Product _id not found!",
        });
      }

      return res.status(200).json({
        product: updatedData,
      });
    } catch (error) {
      console.log("error: ", error);
      if ((error as mongoose.CastError).name == "CastError") {
        return res.status(404).json({
          message: "Product _id not found!",
        });
      }
      return res.status(400).json(error);
    }
  };
  public delete = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const _id = req.query._id;
    try {
      const response = await Product.findOneAndDelete({ _id });
      if (!response) {
        return res.status(404).json({
          message: "Product _id not found!",
        });
      }
      return res.status(200).json({
        message: "Delete successfully!",
      });
    } catch (error) {
      if ((error as mongoose.CastError).name == "CastError") {
        return res.status(404).json({
          message: "Product _id not found!",
        });
      }
      return res.status(400).json(error);
    }
  };
}
