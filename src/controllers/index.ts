import AuthController from "src/controllers/auth";
import ProductController from "./product";

const authController = new AuthController();
const productController = new ProductController()

export { authController, productController };
