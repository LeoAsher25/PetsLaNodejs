import { Router } from "express";
import passport from "passport";
import paginationMiddleware from "src/middleware/common/pagination.middleware";
import "src/middleware/passport";
import Product from "src/models/Product";
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
  .use("/roles", roleRouter)
  .use("/update", async (req, res) => {
    try {
      const response = await Product.updateMany(
        {},
        {
          $set: {
            status: Math.floor(Math.random() * 10) % 3,
          },
        }
      );
      if (response) {
        console.log("res", response);
      }
      return res.status(200).json({
        message: "Update successfully",
      });
    } catch (err) {
      console.log("err", err);
      throw err;
    }
  });

// mainRouter
export const mainRouter = Router();
mainRouter
  .use(paginationMiddleware)
  .use("/auth", authRouter)
  .use("/products", productRouter)
  .use("/", passport.authenticate("jwt", { session: false }), protectedRouter);
