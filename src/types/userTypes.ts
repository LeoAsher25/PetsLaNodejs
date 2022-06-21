import mongoose from "mongoose";

export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  deliveryAddress: IDeliveryAddress[];
  verifyPassword: (pw: string) => Promise<boolean>;
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  username?: string;
  password?: string;
  deliveryAddress: IDeliveryAddress[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IDeliveryAddress {
  _id: string;
  phoneNumber: string;
  address: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}
