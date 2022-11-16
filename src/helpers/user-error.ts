import { ErrorCodes, StatusCodes } from "src/types/status-code.enum";
import { AppError } from "./error";

const userError = {
  requireFields: new AppError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Fill in required entry fields"
  ),
  emailIsInUse: new AppError(
    StatusCodes.CONFLICT,
    ErrorCodes.CONFLICT,
    "Email is already in use"
  ),
  emailIsInvalid: new AppError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Email is invalid"
  ),

  passwordIsInvalid: new AppError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Password "
  ),

  emailPasswordIsIncorrect: new AppError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Email or password is incorrect"
  ),

  noToken: new AppError(
    StatusCodes.NOT_FOUND,
    ErrorCodes.NOT_FOUND,
    "No refresh token supplied!"
  ),

  invalidToken: new AppError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Invalid refresh token!"
  ),
};
export default userError;
