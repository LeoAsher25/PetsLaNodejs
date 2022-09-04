import mongoose from "mongoose";

export interface UserDto extends mongoose.Document {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  age: Number;
  addresses: AddressDto[];
  roles: {
    _id: string;
    name: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
  verifyPassword?: (pw: string) => Promise<boolean>;
}

export type SignUpUserData = Pick<
  UserDto,
  "firstName" | "lastName" | "email" | "password" | "username"
>;

export interface AddressDto {
  _id: string;
  phoneNumber: string;
  address: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum ERole {
  STAFF = "STAFF",
  ADMINISTRATOR = "ADMINISTRATOR",
}

export interface RoleDto {
  _id?: string;
  name: ERole;
  description: string;
  permissions: {
    _id: string;
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export enum EPermission {
  VIEW_PROFILE = "View profile",
  UPDATE_PROFILE = "Update profile",
  MANAGE_USERS = "Manage users",
}

export interface PermissionDto {
  _id?: string;
  name: EPermission;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  roles: {
    _id: string;
    name: string;
  }[];
}
