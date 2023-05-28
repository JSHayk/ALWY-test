import jwt from "jsonwebtoken";
import config from "../config/config.js";
import invalidArguments from "../helpers/invalidArguments.js";

const { secret_access_token, expires_time } = config.token;

export default {
  generate(data) {
    invalidArguments([data]);
    try {
      const token = jwt.sign(data, secret_access_token, {
        expiresIn: expires_time,
      });
      return token;
    } catch (err) {
      throw new Error(err);
    }
  },
  verify(token) {
    try {
      return jwt.verify(token, secret_access_token);
    } catch (err) {
      return null;
    }
  },
};
