import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import "src/middleware/passport";
import authRouter from "src/routes/auth.router";
import orderRouter from "src/routes/order.router";
import permissionRouter from "src/routes/permission.router";
import roleRouter from "src/routes/role.router";
import productRouter from "src/routes/product.router";
import userRouter from "src/routes/user.router";
import { ERole } from "src/types/user.type";
import checkRole from "src/middleware/check-role.middleware";

// protectedRouter:
const protectedRouter = Router();
protectedRouter
  .use("/orders", orderRouter)
  .use("/users", userRouter)
  .use(
    "/roles",
    (req: Request, res: Response, next: NextFunction) =>
      checkRole(req, res, next, ERole.ADMINISTRATOR),
    roleRouter
  )
  .use(
    "/permissions",
    (req: Request, res: Response, next: NextFunction) =>
      checkRole(req, res, next, ERole.ADMINISTRATOR),
    permissionRouter
  );

// mainRouter
export const mainRouter = Router();
mainRouter
  .use("/auth", authRouter)
  .use("/products", productRouter)

  .use("/", passport.authenticate("jwt", { session: false }), protectedRouter);
