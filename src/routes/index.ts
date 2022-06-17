import { Router } from "express";
import passport from "passport";
import "src/middleware/passport";
import authRouter from "src/routes/authRouter";
import productRouter from "./productRouter";

export const initialRoute = Router();
initialRoute.use("/auth", authRouter);
initialRoute.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("home page");
  }
);
initialRoute
  .use("/", passport.authenticate("jwt", { session: false }))
  .use("/products", productRouter);
