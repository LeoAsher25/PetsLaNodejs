import mongoose from "mongoose";
import { IRole } from "src/types/user.types";
export const RoleSchema = new mongoose.Schema<IRole>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    permission: [
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
