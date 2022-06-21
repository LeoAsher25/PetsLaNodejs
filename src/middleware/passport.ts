import { CallbackError } from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as PassportLocal from "passport-local";

import User from "src/models/User";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_ACCESS_TOKEN,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub);
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
      const foundUser = await User.findOne({ username });

      if (!foundUser) {
        return done(null, true);
      }

      const isCorrectPassword = await foundUser.verifyPassword(password);
      if (!isCorrectPassword) {
        return done(null, true);
      }

      return done(null, foundUser);
    } catch (error) {
      done(error as CallbackError, false);
    }
  })
);
