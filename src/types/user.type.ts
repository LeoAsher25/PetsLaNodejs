import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  age: Number;
  addresses: IAddress[];
  role: string[];
  createdAt?: string;
  updatedAt?: string;
  verifyPassword?: (pw: string) => Promise<boolean>;
}

export type ISignUpData = Pick<
  UserInterface,
  "firstName" | "lastName" | "email" | "password" | "username"
>;

export interface IAddress {
  _id: string;
  phoneNumber: string;
  address: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum ERole {
  STAFF = "Staff",
  ADMINISTRATOR = "Administrator",
}

export interface RoleInterface {
  _id?: string;
  name: ERole;
  description: string;
  permission: string[];
  createdAt: Date;
  updatedAt: Date;
}

export enum EPermission {
  VIEW_PROFILE = "View profile",
  UPDATE_PROFILE = "Update profile",
  MANAGE_USERS = "Manage users",
}

export interface PermissionInterface {
  _id?: string;
  name: EPermission;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export declare type PermissionType = {
  id: string;
  name: string;
};
