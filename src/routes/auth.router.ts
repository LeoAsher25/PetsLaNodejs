import express from "express";
import passport from "passport";
import { authController } from "src/controllers";
import authMiddleware from "src/middleware/auth.middleware";
import "src/middleware/passport";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  authMiddleware.checkSignUp,
  authController.handleSignup
);
authRouter.post(
  "/refresh-token",
  authMiddleware.checkRefeshToken,
  authController.handleRefreshToken
);
authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.handleLogin
);

export default authRouter;
