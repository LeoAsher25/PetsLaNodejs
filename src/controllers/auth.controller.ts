import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import authService from "src/services/auth.service";
import { RequestWithUser, TokenResponse } from "src/types/auth.type";
import { StatusCodes } from "src/types/status-code.enum";
import { UserDto } from "src/types/user.type";

// export default class AuthController {

//   constructor() {}

//   // handle signup

// }

const authController = {
  async handleSignup(req: Request, res: Response): Promise<Response> {
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
  },

  //handle login
  async handleLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user = req.user as UserDto;
      const tokenResponse = await authService.login(user);
      return res.status(StatusCodes.OK).json(tokenResponse);
    } catch (err) {
      next(err);
    }
  },

  async handleRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const refreshToken = res.locals.refreshToken;

      let tokenResponse: TokenResponse = await authService.refreshToken(
        refreshToken
      );

      return res.status(StatusCodes.OK).json(tokenResponse);
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req: Request, res: Response): Promise<Express.User> {
    return res.status(StatusCodes.OK).json(req.user!);
  },
};
export default authController;
