import { Router } from "express";
import passport from "passport";
import "src/middleware/passport";
import authRouter from "src/routes/auth.router";
import orderRouter from "src/routes/order.router";
import permissionRouter from "src/routes/permission.router";
import productRouter from "src/routes/product.router";
import roleRouter from "src/routes/role.router";
import userRouter from "src/routes/user.router";

// protectedRouter:
const protectedRouter = Router();
protectedRouter
  .use("/orders", orderRouter)
  .use("/users", userRouter)
  .use("/permissions", permissionRouter)
  .use("/roles", roleRouter);

// mainRouter
export const mainRouter = Router();
mainRouter
  .use("/auth", authRouter)
  .use("/products", productRouter)
  .use("/", passport.authenticate("jwt", { session: false }), protectedRouter);
