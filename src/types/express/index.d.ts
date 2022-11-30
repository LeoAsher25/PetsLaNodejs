import { UserDto } from "src/types/user.type";
declare module "express-serve-static-core" {
  interface Request {
    user?: UserDto;
  }
}
