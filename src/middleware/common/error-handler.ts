import { NextFunction, Request, Response } from "express";
import { ErrorResponse, AppError } from "src/helpers/error";
import { StatusCodes } from "src/types/status-code.enum";

const ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error && error instanceof AppError) {
    return res
      .status(error.status!)
      .json(ErrorResponse(error.code!, error.message));
  } else {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse(error.name!, error.message));
  }
};

export default ErrorHandler;
