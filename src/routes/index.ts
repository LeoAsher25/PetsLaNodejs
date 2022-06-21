import { Router } from "express";
import passport from "passport";
import "src/middleware/passport";
import authRouter from "src/routes/authRouter";
import orderRouter from "./OrderRouter";
import productRouter from "./productRouter";
import userRouter from "./userRoutes";

// protectedRouter:
const protectedRouter = Router();
protectedRouter
  .use("/user", userRouter)
  .use("/products", productRouter)
  .use("/order", orderRouter);

// publicRouter:
const publicRouter = Router();

// mainRouter
export const mainRouter = Router();
mainRouter.use("/auth", authRouter);
mainRouter.use(
  "/",
  passport.authenticate("jwt", { session: false }),
  protectedRouter
);

/**
 * @swagger
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

mainRouter.get("/", (req, res) => {
  console.log("hello world");
  return res.send("Hello world!");
});
