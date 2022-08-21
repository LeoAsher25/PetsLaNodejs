import { Permission, Role } from "@prisma/client";
import prisma from "src/config/prisma/prisma.config";

const roleService = {
  async addPermission(role: Role, permission: Permission) {
    try {
      const response1 = await prisma.role.update({
        where: { id: role.id },
        data: {
          permissions: [...role.permissions, permission.id],
        },
      });
      const response2 = await prisma.permission.update({
        where: { id: permission.id },
        data: {
          roles: [...permission.roles, role.id],
        },
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
