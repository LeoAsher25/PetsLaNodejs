import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
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
      const updatedData = await Product.findOneAndUpdate({
        _id: requestData._id,
      });

      return res.status(200).json({
        product: updatedData,
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  };
  public delete = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const _id = req.params._id;
    try {
      await Product.deleteOne({ _id });
      return res.status(200).json({
        message: "Delete successfully!",
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  };
}
