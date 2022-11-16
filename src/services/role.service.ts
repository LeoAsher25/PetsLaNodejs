import Permission from "src/models/Permission";
import Role from "src/models/Role";
import { PermissionDto, RoleDto } from "src/types/user.type";

const roleService = {
  async addPermission(role: RoleDto, permission: PermissionDto) {
    try {
      const response1 = await Role.findOneAndUpdate({
        _id: role._id,
      });

      const response2 = await Permission.findOneAndUpdate({
        _id: permission._id,
      });
      if (response1 && response2) {
        return {
          message: "Assign permission successfully",
        };
      } else {
        throw new Error("Assign permission fail");
      }
    } catch (err) {
      throw err;
    }
  },
};

export default roleService;
