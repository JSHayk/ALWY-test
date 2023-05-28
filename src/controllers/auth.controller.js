import config from "../config/config.js";
import authService from "../services/auth.service.js";

const { max_age, httpOnly } = config.storage;

export default {
  async register(req, res) {
    try {
      const { sc, message } = await authService.register(req.body, req.user);
      res.status(sc).send({ message });
    } catch (err) {
      throw new Error(err);
    }
  },
  async login(req, res) {
    try {
      const { sc, message, data } = await authService.login(req.body, req.user);
      if (sc === 200) {
        res.cookie("token", data?.token, {
          maxAge: max_age,
          httpOnly,
        });
      }
      res.status(sc).send(data || { message });
    } catch (err) {
      throw new Error(err);
    }
  },
  logout(req, res) {
    try {
      const { token } = req.cookies;
      const { sc, message } = authService.logout(token);
      res.clearCookie("token");
      res.status(sc).send({ message });
    } catch (err) {
      throw new Error(err);
    }
  },
};
