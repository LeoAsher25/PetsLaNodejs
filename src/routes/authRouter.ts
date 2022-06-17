import "src/middleware/passport";
import express from "express";
import passport from "passport";
import { authController } from "src/controllers";

const authRouter = express.Router();

authRouter.post("/signup", authController.create);
authRouter.post("/refresh-token", authController.handleRefreshToken);
authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.handleLogin
);

export default authRouter;
