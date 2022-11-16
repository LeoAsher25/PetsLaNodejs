import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import authService from "src/services/auth.service";
import { TokenResponse } from "src/types/auth.type";
import { StatusCodes } from "src/types/status-code.enum";
import { UserDto } from "src/types/user.type";

export default class AuthController {
  tokenList: { [key: string]: object } = {};

  constructor() {}

  // handle signup
  public handleSignup = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const postData: UserDto = req.body;
    try {
      let user = {
        firstName: postData.firstName,
        lastName: postData.lastName,
        username: postData.username,
        email: postData.email,
        password: postData.password,
      };

      const newUser = await authService.signUp(user);

      return res.status(StatusCodes.OK).json({
        message: "Create new user successfully!",
        user: newUser,
      });
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(authService.handleError(error));
    }
  };

  //handle login
  public handleLogin = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const user = req.user as UserDto;

      const tokenResponse = await authService.login(user);

      return res.status(StatusCodes.OK).json(tokenResponse);
    } catch (err) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: (err as Error).message });
    }
  };

  public handleRefreshToken = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const refreshToken = res.locals.refreshToken;

      let tokenResponse: TokenResponse = await authService.refreshToken(
        refreshToken
      );

      return res.status(StatusCodes.OK).json(tokenResponse);
    } catch (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
  };
}
