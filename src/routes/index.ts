import { Router } from "express";
import passport from "passport";
import { productController } from "src/controllers";
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
mainRouter.use(
  "/products",
  passport.authenticate("jwt", { session: false }),
  productRouter
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
