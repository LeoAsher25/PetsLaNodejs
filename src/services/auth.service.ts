import { Prisma, User } from "@prisma/client";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import prisma from "src/config/prisma/prisma.config";
import { ETokenType, TokenResponse } from "src/types/auth.type";
import { UserInterface } from "src/types/user.type";

const authService = {
  encodedToken(userId: any, username: string, tokenType: ETokenType): string {
    return JWT.sign(
      {
        sub: userId,
        iss: username,
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
  },
  handleError(error: any): { [key: string]: string } {
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
  },

  async signUp(user: Prisma.UserCreateInput): Promise<User> {
    try {
      const newUser = await prisma.user.create({
        data: user,
      });
      return newUser;
    } catch (err) {
      throw err;
    }
  },

  async login(user: UserInterface): Promise<TokenResponse> {
    try {
      const accessToken: string = this.encodedToken(
        user?.id,
        user?.username,
        ETokenType.ACCESS_TOKEN
      );

      let tokenResponse: TokenResponse = {
        accessToken,
        expiresAt: Date.now() + Number(process.env.ACCESS_TOKEN_LIFE),
        refreshExpiresAt: Date.now() + Number(process.env.REFRESH_TOKEN_LIFE),
      };

      const userToken = await prisma.userToken.findFirst({
        where: {
          userId: user?.id,
        },
      });

      if (userToken) {
        tokenResponse["refreshToken"] = userToken.token as string;
      } else {
        const refreshToken: string = this.encodedToken(
          user?.id,
          user?.username,
          ETokenType.REFRESH_TOKEN
        );
        await prisma.userToken.create({
          data: {
            userId: user?.id,
            token: refreshToken,
            expireAt: new Date(
              Date.now() + Number(process.env.REFRESH_TOKEN_LIFE)
            ),
          },
        });

        tokenResponse["refreshToken"] = refreshToken;
      }

      return tokenResponse;
    } catch (err) {
      throw err;
    }
  },

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      let tokenResponse: TokenResponse = {
        refreshToken,
        expiresAt: Date.now() + Number(process.env.ACCESS_TOKEN_LIFE),
        refreshExpiresAt: Date.now() + Number(process.env.REFRESH_TOKEN_LIFE),
      };

      JWT.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_TOKEN!,
        (err: any, decoded: any) => {
          if (err) {
            throw err;
          } else {
            tokenResponse["accessToken"] = authService.encodedToken(
              decoded.sub,
              decoded.iss,
              ETokenType.ACCESS_TOKEN
            );
          }
        }
      );
      return tokenResponse;
    } catch (err) {
      throw err;
    }
  },
};
export default authService;
