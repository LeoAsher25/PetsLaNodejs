import mongoose from "mongoose";
import { RoleDto } from "src/types/user.type";
export const RoleSchema = new mongoose.Schema<RoleDto>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    permissions: [
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

const Role = mongoose.model("Role", RoleSchema);
export default Role;
