import mongoose from "mongoose";
import { IRole } from "src/types/userTypes";
export const RoleSchema = new mongoose.Schema<IRole>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    permission: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("UserRole", RoleSchema);
export default Role;
