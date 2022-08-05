import AuthController from "src/controllers/auth";
import OrderController from "./order";
import PermissionController from "./permission";
import ProductController from "./product";
import RoleController from "./role";
2;
import UserController from "./user";

const authController = new AuthController();
const productController = new ProductController();
const userController = new UserController();
const orderController = new OrderController();
const roleController = new RoleController();
const permissionController = new PermissionController();

export {
  authController,
  productController,
  userController,
  orderController,
  roleController,
  permissionController,
};
