import { NSUser } from "../@types/user.js";
import { Permission } from "../db/entities/Permission.js";

const insertPermission = async (payload: NSUser.Permission) => {
  try {
    const permission = Permission.create({
      name: payload.name
    });
    await permission.save();
    return permission;
  } catch (error) {
    console.log(error);
    throw ("Something went wrong");
  }
}

export default insertPermission;