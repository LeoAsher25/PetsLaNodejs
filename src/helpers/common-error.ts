import { AppError } from "src/helpers/error";
import { ErrorCodes, StatusCodes } from "src/types/status-code.enum";

const commonError = {
  invalidObjectId: new AppError(
    StatusCodes.BAD_REQUEST,
    ErrorCodes.BAD_REQUEST,
    "Invalid objectId"
  ),
};

export default commonError;
