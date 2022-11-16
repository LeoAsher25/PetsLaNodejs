import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import userError from "src/helpers/user-error";
import REGEX from "src/helpers/validation";
import User from "src/models/User";
import { SignUpUserData } from "src/types/user.type";

const authMiddleware = {
  async checkSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData: SignUpUserData = req.body;

      if (
        !requestData.firstName ||
        !requestData.lastName ||
        !requestData.email ||
        !requestData.password
      ) {
        throw userError.requireFields;
      }

      if (!REGEX.email.test(requestData.email)) {
        throw userError.emailIsInvalid;
      }

      const foundUserByEmail = await User.findOne({
        email: requestData.email,
      });

      if (foundUserByEmail) {
        throw userError.emailIsInUse;
      }
      next();
    } catch (err) {
      next(err);
    }
  },

  async checkLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const requestData = req.body;
      if (!REGEX.email.test(requestData.email)) {
        throw userError.emailIsInvalid;
      }
      const user = await User.findOne({
        email: requestData.email,
      });

      if (!user) {
        throw userError.emailPasswordIsIncorrect;
      }

      const isCorrect = await bcrypt.compare(
        requestData?.password,
        user?.password!
      );

      if (!isCorrect) {
        throw userError.emailPasswordIsIncorrect;
      }

      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },
  async checkRefeshToken(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw userError.noToken;
    }

    res.locals.refreshToken = refreshToken;
    next();
  },
};

export default authMiddleware;
