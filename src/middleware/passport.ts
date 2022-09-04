import bcrypt from "bcryptjs";
import { CallbackError } from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as PassportLocal from "passport-local";
import prisma from "src/config/prisma/prisma.config";
import User from "src/models/User";

// import User from "src/models/User";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_ACCESS_TOKEN,
    },
    async (payload, done) => {
      try {
        // const user = await prisma.user.findFirst({
        //   where: {
        //     id: payload.sub,
        //   },
        // });
        const user = await User.findOne({
          _id: payload.sub,
        });
        if (!user) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new PassportLocal.Strategy(async function (username, password, done) {
    try {
      // const foundUser = await prisma.user.findFirst({
      //   where: {
      //     username,
      //   },
      // });
      const foundUser = await User.findOne({
        username,
      });

      const isValid = await bcrypt.compare(password, foundUser?.password!);
      if (!isValid) {
        return done(null, false);
      }

      // if (!foundUser || foundUser.password !== password) {
      //   return done(null, false);
      // }
      // const isCorrectPassword = await foundUser.verifyPassword!(password);
      // if (!isCorrectPassword) {
      //   return done(null, true);
      // }
      return done(null, foundUser);
    } catch (error) {
      done(error as CallbackError, false);
    }
  })
);
