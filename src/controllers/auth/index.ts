import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import { CrudController } from "src/controllers/CrudController";
import User from "src/models/User";
import UserToken from "src/models/UserToken";
import { IUser } from "src/types/userTypes";

enum ETokenType {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export default class AuthController extends CrudController {
  tokenList: { [key: string]: object } = {};

  constructor() {
    super();
  }

  private encodedToken = (
    userId: any,
    username: string,
    tokenType: ETokenType
  ): string => {
    return JWT.sign(
      {
        iss: username,
        sub: userId,
      },
      tokenType === ETokenType.ACCESS_TOKEN
        ? process.env.JWT_SECRET_ACCESS_TOKEN!
        : process.env.JWT_SECRET_REFRESH_TOKEN!,
      {
        expiresIn:
          tokenType === ETokenType.ACCESS_TOKEN
            ? Number(process.env.ACCESS_TOKEN_LIFE)
            : Number(process.env.REFRESH_TOKEN_LIFE),
      }
    );
  };

  private handleError = (error: any): { [key: string]: string } => {
    const returnedError: { [key: string]: string } = {};
    if (error.message.includes("User validation failed")) {
      Object.values((error as mongoose.Error.ValidationError).errors).forEach(
        (err) => {
          const _error = err as mongoose.Error.ValidatorError;
          returnedError[_error.properties.path as string] =
            _error.properties.message;
        }
      );
    }

    return returnedError;
  };

  // handle signup
  public create = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const postData: IUser = req.body;
    try {
      if (
        !postData.firstName &&
        !postData.lastName &&
        !postData.email &&
        !postData.username &&
        !postData.password
      ) {
        return res.status(400).json({
          message: "Fill in all required entry fields!",
        });
      } else if (!postData.firstName) {
        return res.status(400).json({
          message: "First name is required!",
        });
      } else if (!postData.lastName) {
        return res.status(400).json({
          message: "Last name is required!",
        });
      } else if (!postData.email) {
        return res.status(400).json({
          message: "Email is required!",
        });
      } else if (!postData.username) {
        return res.status(400).json({
          message: "Username is required!",
        });
      } else if (!postData.password) {
        return res.status(400).json({
          message: "Password is required!",
        });
      }

      const foundUserByEmail = await User.findOne({ email: postData.email });
      if (foundUserByEmail) {
        return res
          .status(400)
          .json({ error: { message: "Email is already in use." } });
      }

      const foundUserByUsername = await User.findOne({
        username: postData.username,
      });
      if (foundUserByUsername) {
        return res
          .status(400)
          .json({ error: { message: "Username is already in use." } });
      }

      const newUser = await User.create(postData);
      return res.status(200).json({
        message: "Create new user successfully!",
        user: newUser,
      });
    } catch (error) {
      const err = this.handleError(error);
      return res.status(400).json(this.handleError(error));
    }
  };

  public read(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    res.send("GET /user request received");
  }

  //handle login
  public handleLogin = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const { username } = req.body;
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(400).json({
        error: {
          message: "The username does not exits!",
        },
      });
    }

    const accessToken: string = this.encodedToken(
      foundUser._id,
      foundUser.username,
      ETokenType.ACCESS_TOKEN
    );

    let jsonResponse: { [key: string]: string } = {
      accessToken,
    };

    const userToken = await UserToken.findOne({ userId: foundUser._id });
    if (userToken) {
      jsonResponse["refreshToken"] = userToken.token;
    } else {
      const refreshToken: string = this.encodedToken(
        foundUser._id,
        foundUser.username,
        ETokenType.REFRESH_TOKEN
      );
      await UserToken.create({
        userId: foundUser._id,
        token: refreshToken,
      });

      jsonResponse["refreshToken"] = refreshToken;
    }

    return res.status(200).json(jsonResponse);
  };

  public handleRefreshToken = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({
          message: "No refresh token supplied!",
        });
      }
      const foundToken = await UserToken.findOne({ token: refreshToken });
      if (!foundToken) {
        res.status(400).json({
          message: "Invalid refresh token!",
        });
      }

      let newToken = "";

      JWT.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_TOKEN!,
        (err: any, decoded: any) => {
          if (err) {
            return res.status(400).json(err);
          } else {
            newToken = this.encodedToken(
              decoded.sub,
              decoded.iss,
              ETokenType.ACCESS_TOKEN
            );
          }
        }
      );

      return res.status(200).json({ token: newToken });
    } catch (error) {
      return res.status(400).json(error);
    }
  };

  public update(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }

  public delete(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): void {
    throw new Error("Method not implemented.");
  }
}
