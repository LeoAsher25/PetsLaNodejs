import express from "express";
import passport from "passport";
import { authController } from "src/controllers";
import "src/middleware/passport";

const authRouter = express.Router();

authRouter.post("/signup", authController.handleSignup);
authRouter.post("/refresh-token", function (req, res, next )   {

}, authController.handleRefreshToken);
authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  authController.handleLogin
);

export default authRouter;
