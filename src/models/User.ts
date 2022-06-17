import mongoose, { CallbackError, Schema } from "mongoose";
import validationHelper from "src/helpers/validation";

import bcrypt from "bcryptjs";

export const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: [true],
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
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    // generate a password hash (salt + hash)
    const passwordHashed = await bcrypt.hash(this.password, salt);
    // re-assign password hashed
    this.password = passwordHashed;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

UserSchema.methods.verifyPassword = async function (newPassword: string) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error as string);
  }
};

const User = mongoose.model("User", UserSchema);
export default User;
