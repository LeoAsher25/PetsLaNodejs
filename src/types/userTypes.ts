import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  deliveryAddress: IAddress[];
  role: string[];
  createdAt?: string;
  updatedAt?: string;
  verifyPassword?: (pw: string) => Promise<boolean>;
}

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
export interface IRole {
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

export interface IPermission {
  _id?: string;
  name: EPermission;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
// export interface IUser {
//   _id?: string;
//   firstName: string;
//   lastName: string;
//   email?: string;
//   username?: string;
//   password?: string;
//   deliveryAddress: IAddress[];
//   createdAt?: string;
//   updatedAt?: string;
//   // verifyPassword: (pw: string) => Promise<boolean>;
// }
