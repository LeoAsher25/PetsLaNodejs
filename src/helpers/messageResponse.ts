import { EStatusCodes } from "src/types/statusCode";

export function respondSuccess(data: any = {}, message: string = "Success") {
  return {
    code: EStatusCodes.STATUS_CODE_SUCCESS,
    message,
    data,
  };
}

export function responseWithError(
  errorCode: EStatusCodes,
  message: string = "Error",
  data: any = {}
) {
  return {
    code: errorCode,
    message,
    errors: data,
  };
}
