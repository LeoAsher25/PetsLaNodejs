// import { UserSchema } from "src/models/User";
// import bcrypt from "bcryptjs";
// import { CallbackError } from "mongoose";
// import { IUser } from "src/types/user.types";

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
