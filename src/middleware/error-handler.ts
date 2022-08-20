import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "src/types/status-code.enum";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
};
export default errorHandler;
