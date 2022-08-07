import mongoose, { Schema } from "mongoose";
import validationHelper from "src/helpers/validation";
import { AddressSchema } from "./Address";

import { IUser } from "src/types/user.types";

export const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      validate: [
        validationHelper.isValidUsername,
        "Please enter a valid username!",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      validate: [validationHelper.isValidEmail, "Please enter a valid email!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      validate: [validationHelper.isValidPassword, "Password is incorrect!"],
    },
    deliveryAddress: {
      type: [AddressSchema],
    },
    role: [
      {
        type: {
          _id: mongoose.Schema.Types.ObjectId,
          name: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
