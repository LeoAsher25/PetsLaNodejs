import mongoose from "mongoose";
import { PermissionDto } from "src/types/user.type";
export const PermissionSchema = new mongoose.Schema<PermissionDto>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    roles: [
      {
        type: {
          _id: mongoose.Schema.Types.ObjectId,
          name: String,
        },
      },
    ]
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model("Permission", PermissionSchema);
export default Permission;
