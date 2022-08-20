import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import prisma from "src/config/prisma/prisma.config";
// import UserToken from "src/models/UserToken";
import { IUser } from "src/types/user.types";

enum ETokenType {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export default class AuthController {
  tokenList: { [key: string]: object } = {};

  constructor() {}

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
  public handleSignup = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const postData: IUser = req.body;
    try {
      let user: Prisma.UserCreateInput = {
        firstName: postData.firstName,
        lastName: postData.lastName,
        username: postData.username,
        email: postData.email,
        password: postData.password,
      };

      const newUser = await prisma.user.create({
        data: user,
      });

      // const newUser = await User.create(postData);
      return res.status(200).json({
        message: "Create new user successfully!",
        user: newUser,
      });
    } catch (error) {
      const err = this.handleError(error);
      return res.status(400).json(this.handleError(error));
    }
  };

  //handle login
  public handleLogin = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<Response<any, Record<string, any>>> => {
    const { username } = req.body;

    // const foundUser = await User.findOne({ username });
    const foundUser = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!foundUser) {
      return res.status(400).json({
        error: {
          message: "The username does not exits!",
        },
      });
    }

    const accessToken: string = this.encodedToken(
      foundUser.id,
      foundUser.username,
      ETokenType.ACCESS_TOKEN
    );

    let jsonResponse: { [key: string]: string } = {
      accessToken,
    };

    // const userToken = await UserToken.findOne({ userId: foundUser.id });
    const userToken = await prisma.userToken.findFirst({
      where: {
        userId: foundUser.id,
      },
    });
    if (userToken) {
      jsonResponse["refreshToken"] = userToken.token as string;
    } else {
      const refreshToken: string = this.encodedToken(
        foundUser.id,
        foundUser.username,
        ETokenType.REFRESH_TOKEN
      );
      await prisma.userToken.create({
        data: {
          userId: foundUser.id,
          token: refreshToken,
          expireAt: new Date(
            Date.now() + Number(process.env.REFRESH_TOKEN_LIFE)
          ),
        },
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
      const foundToken = await prisma.userToken.findFirst({
        where: { token: refreshToken },
      });
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
}
