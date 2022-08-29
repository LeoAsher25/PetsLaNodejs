import mongoose from "mongoose";
import { RoleInterface } from "src/types/user.type";
export const RoleSchema = new mongoose.Schema<RoleInterface>(
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
