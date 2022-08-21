import { NextFunction, Request, Response } from "express";
import prisma from "src/config/prisma/prisma.config";
import { StatusCodes } from "src/types/status-code.enum";
import { ISignUpData } from "src/types/user.type";

const authMiddleware = {
  async checkSignUp(req: Request, res: Response, next: NextFunction) {
    const requestData: ISignUpData = req.body;
    if (
      !requestData.firstName ||
      !requestData.lastName ||
      !requestData.email ||
      !requestData.username ||
      !requestData.password
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Fill in required entry fields!",
      });
    }

    const foundUserByEmail = await prisma.user.findFirst({
      where: {
        email: requestData.email,
      },
    });

    if (foundUserByEmail) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Email is already in use.",
      });
    }

    const foundUserByUsername = await prisma.user.findFirst({
      where: {
        username: requestData.username,
      },
    });

    if (foundUserByUsername) {
      return res.status(StatusCodes.CONFLICT).json({
        message: "Username is already in use.",
      });
    }

    next();
  },
  async checkRefeshToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No refresh token supplied!",
      });
    }

    const foundToken = await prisma.userToken.findFirst({
      where: { token: refreshToken },
    });
    if (!foundToken) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Invalid refresh token!",
      });
    }
    res.locals.refreshToken = refreshToken;
    next();
  },
};

export default authMiddleware;
