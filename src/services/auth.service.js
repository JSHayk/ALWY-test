import bcrypt from "bcrypt";
import connect from "../db/connect.js";
import tokenService from "./token.service.js";
import userDto from "../dtos/user.dto.js";
import invalidArguments from "../helpers/invalidArguments.js";

export default {
  async register(data, user) {
    invalidArguments([data]);
    const { email, password } = data;
    try {
      if (user) {
        return {
          sc: 400,
          message: "The email is exist!",
        };
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await connect.query("INSERT INTO users (email, password) VALUES(?, ?)", [
        email,
        hashedPassword,
      ]);
      return {
        sc: 200,
        message: "The user was added",
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async login(data, user) {
    invalidArguments([data]);
    const { password } = data;
    try {
      if (!user) {
        return {
          sc: 403,
          message: "There is no user with this email!",
        };
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return {
          sc: 403,
          message: "Wrong password!",
        };
      }
      const user_dto = userDto(user);
      const token = tokenService.generate(user_dto);
      return {
        sc: 200,
        data: {
          user: user_dto,
          token,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  logout(token) {
    const isVerifyed = tokenService.verify(token);
    if (!isVerifyed) {
      return {
        sc: 401,
        message: "Invalid Token!",
      };
    }
    return {
      sc: 200,
      message: "Successfully logout!",
    };
  },
};
