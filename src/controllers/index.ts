import AuthController from "src/controllers/auth";
import OrderController from "./order";
import ProductController from "./product";
import UserController from "./user";

const authController = new AuthController();
const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();

export { authController, productController, userController, orderController };
