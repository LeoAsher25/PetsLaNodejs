import { Request, Response } from "express";

export abstract class CrudController {
  public abstract create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>;
  // public abstract read(
  //   req: Request,
  //   res: Response
  // ): Promise<Response<any, Record<string, any>>>;
  public abstract update(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>;
  public abstract delete(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>;
  public abstract getAll(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>;
  public abstract getOne(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>>;
}
