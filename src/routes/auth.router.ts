import { Router } from "express";
import passport from "passport";
import { authController } from "src/controllers";
import authMiddleware from "src/middleware/auth.middleware";
import "src/middleware/passport";

const authRouter = Router();

authRouter
  .post("/sign-up", authMiddleware.checkSignUp, authController.handleSignup)
  .post(
    "/refresh-token",
    authMiddleware.checkRefeshToken,
    authController.handleRefreshToken
  )
  .post(
    "/login",
    passport.authenticate("local", { session: false }),
    authController.handleLogin
  )
  .get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    authController.getProfile
  );

export default authRouter;
