import { createPool } from "mysql2/promise";
import config from "../config/config.js";

const { name, password, user, host } = config.db;

const connect = createPool({
  user,
  password,
  host,
  database: name,
});

export default connect;
