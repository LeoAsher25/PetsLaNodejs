import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "src/types/status-code.enum";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error handler", err);
  return res.status(res.statusCode).json({ error: err.message });
};
export default errorHandler;
