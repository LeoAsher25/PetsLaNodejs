import { NextFunction, Request, Response } from "express";
import commonError from "src/helpers/common-error";
import ValidatorHelper from "src/helpers/validation";
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE = 0;

const checkIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.params;

  if (!ValidatorHelper.objectId(_id)) {
    throw commonError.invalidObjectId;
  }

  next();
};

export default checkIdMiddleware;
