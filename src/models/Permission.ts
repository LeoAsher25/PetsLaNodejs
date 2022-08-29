import mongoose from "mongoose";
import { PermissionInterface } from "src/types/user.type";
export const PermissionSchema = new mongoose.Schema<PermissionInterface>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model("Permission", PermissionSchema);
export default Permission;
