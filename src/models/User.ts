// import mongoose, { CallbackError, Schema } from "mongoose";
// import validationHelper from "src/helpers/validation";
// import { AddressSchema } from "./Address";
// import bcrypt from "bcryptjs";

// import { IUser } from "src/types/user.types";

// export const UserSchema = new Schema<IUser>(
//   {
//     firstName: { type: String },
//     lastName: { type: String },
//     username: {
//       type: String,
//       required: [true, "Username is required!"],
//       unique: true,
//       validate: [
//         validationHelper.isValidUsername,
//         "Please enter a valid username!",
//       ],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required!"],
//       unique: true,
//       lowercase: true,
//       validate: [validationHelper.isValidEmail, "Please enter a valid email!"],
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required!"],
//       validate: [validationHelper.isValidPassword, "Password is incorrect!"],
//     },
//     age: {
//       type: Number,
//     },
//     addresses: {
//       type: [AddressSchema],
//     },
//     role: [
//       {
//         type: {
//           _id: mongoose.Schema.Types.ObjectId,
//           name: String,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// UserSchema.methods.verifyPassword = async function (newPassword: string) {
//   try {
//     const isValid = await bcrypt.compare(newPassword, this.password);
//     return isValid;
//   } catch (error) {
//     throw new Error(error as string);
//   }
// };

// UserSchema.pre<IUser>("save", async function (next) {
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

// const User = mongoose.model("User", UserSchema);
// export default User;
