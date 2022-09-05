import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";
import { AddressSchema } from "./Address";

import { UserDto } from "src/types/user.type";

export const UserSchema = new Schema<UserDto>(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
    },
    addresses: {
      type: [AddressSchema],
    },
    roles: [
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

UserSchema.methods.verifyPassword = async function (newPassword: string) {
  try {
    const isValid = await bcrypt.compare(newPassword, this.password);
    return isValid;
  } catch (error) {
    throw new Error(error as string);
  }
};

// UserSchema.pre<UserDto>("save", async function (next) {
//   try {
//     // generate a salt
//     const salt = await bcrypt.genSalt(10);
//     // generate a password hash (salt + hash)
//     const passwordHashed = await bcrypt.hash(this.password, salt);
//     // re-assign password hashed
//     this.password = passwordHashed;
//     next();
//   } catch (error) {
//     next(error as CallbackError);
//   }
// });

const User = mongoose.model("User", UserSchema);
export default User;
