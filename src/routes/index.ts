import { Router } from "express";
import passport from "passport";
import "src/middleware/passport";
import authRouter from "src/routes/authRouter";
import productRouter from "./productRouter";

// protectedRouter:
const protectedRouter = Router();
protectedRouter.use("/products", productRouter);

// publicRouter:
const publicRouter = Router();


// mainRouter
export const mainRouter = Router();
mainRouter.use("/auth", authRouter);
mainRouter.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("home page");
  }
);
mainRouter.use(
  "/",
  passport.authenticate("jwt", { session: false }),
  protectedRouter
);
