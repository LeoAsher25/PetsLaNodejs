import { Router } from "express";
import passport from "passport";
import "src/middleware/passport";
import authRouter from "src/routes/auth.router";
import orderRouter from "src/routes/order.router";
import permissionRouter from "src/routes/permission.router";
import roleRouter from "src/routes/role.router";
import productRouter from "src/routes/product.router";
import userRouter from "src/routes/user.routes";

// protectedRouter:
const protectedRouter = Router();
protectedRouter
  .use("/order", orderRouter)
  .use("/user", userRouter)
  .use("/permission", permissionRouter)
  .use("/role", roleRouter);

// mainRouter
export const mainRouter = Router();
mainRouter
  .use("/auth", authRouter)
  .use("/products", productRouter)

  .use("/", passport.authenticate("jwt", { session: false }), protectedRouter);
