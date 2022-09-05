import { NextFunction, Request, Response } from "express";
import userError from "src/helpers/user-error";
import { ERole, UserDto } from "src/types/user.type";

const checkRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
  role: any
) => {
  const user = req.user as UserDto;
  const check = user?.roles.some((item) => {
    return item.name == role;
  });
  if (!check) {
    next(userError.forbidden);
  }
  next();
};
export default checkRole;
