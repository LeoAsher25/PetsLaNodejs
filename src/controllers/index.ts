import AuthController from "src/controllers/auth";
import ProductController from "./product";
import UserController from "./user";

const authController = new AuthController();
const productController = new ProductController();
const userController = new UserController();

export { authController, productController, userController };
