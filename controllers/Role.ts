import { In } from "typeorm";
import { NSUser } from "../@types/user.js";
import { Permission } from "../db/entities/Permission.js";
import { Role } from "../db/entities/Role.js";

const insertRole = async (payload: NSUser.Role) => {
  try {
    const role = new Role();
    role.name = payload.name;
    role.permissions = await Permission.findBy({
      id: In(payload.permissions)
    });
    await role.save();
    return role;
  } catch (error) {
    throw ("Something went wrong");
  }
}

export default insertRole;