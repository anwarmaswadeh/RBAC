import { DataSource } from "typeorm";
import { User } from "./entities/User.js";
import { Role } from "./entities/Role.js";

import { Permission } from "./entities/Permission.js";

const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    database: "RBAC",
    username: "root",
    password: "",
    entities:[Permission,User,Role],
    synchronize: false,
    logging: false

  });

  
const initialize = () =>{
    dataSource.initialize().then(() => {
        console.log("Connected to DB!");
      }).catch(err => {
        console.error("Failed to connect to DB: " + err);
      });
    }
    export default {dataSource,initialize};