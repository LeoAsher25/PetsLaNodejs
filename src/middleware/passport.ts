import { AppError } from "src/helpers/error";
import { CallbackError } from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as PassportLocal from "passport-local";
import User from "src/models/User";
import { UserDto } from "src/types/user.type";
import { ErrorCodes } from "src/types/status-code.enum";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_ACCESS_TOKEN,
    },
    async (payload, done) => {
      try {
        const user = await User.findOne({
          _id: payload.sub,
        }).lean();
        if (!user) {
          return done(null, false);
        }
        const { password, ...foundUser } = user;
        done(null, foundUser);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new PassportLocal.Strategy(async function (_username, _password, done) {
    try {
      const user = await User.findOne({
        username: _username,
      });

      if (!user) {
        return done(
          new AppError(401, ErrorCodes.UNAUTHORIZED, "Username is not exist"),
          false
        );
      }
      const isCorrectPassword = await user.verifyPassword(_password!);
      if (!isCorrectPassword) {
        return done(
          new AppError(401, ErrorCodes.UNAUTHORIZED, "Password is not correct"),
          false
        );
      }

      const { password, ...foundUser } = user.toObject();

      return done(null, foundUser);
    } catch (error) {
      done(error as CallbackError, false);
    }
  })
);
