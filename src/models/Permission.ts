import mongoose from "mongoose";
import { IPermission } from "src/types/userTypes";
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

const Permission = mongoose.model("Role", PermissionSchema);
export default Permission;
