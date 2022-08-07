import AuthController from "src/controllers/auth.controller";
import OrderController from "./order.controller";
import PermissionController from "./permission.controller";
import ProductController from "./product.controller";
import RoleController from "./role.controller";
2;
import UserController from "./user.controller";

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
