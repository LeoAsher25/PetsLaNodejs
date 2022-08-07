import mongoose from "mongoose";
import { IPermission } from "src/types/user.types";
export const PermissionSchema = new mongoose.Schema<IPermission>(
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
