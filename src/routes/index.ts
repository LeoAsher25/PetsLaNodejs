import { Router } from "express";
import passport from "passport";
import "src/middleware/passport";
import authRouter from "src/routes/authRouter";
import orderRouter from "src/routes/orderRouter";
import permissionRouters from "src/routes/permissionRouter";
import productRouter from "src/routes/productRouter";
import userRouter from "src/routes/userRoutes";

// protectedRouter:
const protectedRouter = Router();
protectedRouter.use("/order", orderRouter);

// mainRouter
export const mainRouter = Router();
mainRouter
  .use("/auth", authRouter)
  .use("/products", productRouter)
  .use("/user", userRouter)
  .use("/permission", permissionRouters)
  .use("/", passport.authenticate("jwt", { session: false }), protectedRouter);
