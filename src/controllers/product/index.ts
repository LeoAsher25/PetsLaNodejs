import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { CrudController } from "../CrudController";

export default class ProductController extends CrudController {
  public create(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
  public read(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
  public update(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
  public delete(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
}
