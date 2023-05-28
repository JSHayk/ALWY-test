import checkUser from "../helpers/checkUser.js";
import validation from "../validation/index.js";

export default {
  checkBody(req, res, next) {
    const { password, email } = req.body;
    if (!password || !email)
      return res.status(422).send({ ms: "The email and password must be!" });
    next();
  },
  checkValidation(req, res, next) {
    const { username, password, email } = req.body;
    if (!validation.isEmailValid(email)) {
      return res.status(422).send({ ms: "Invalid email!" });
    }
    if (!validation.isPasswordValid(password)) {
      return res.status(422).send({ ms: "Invalid password!" });
    }
    next();
  },
  checkToken(req, res, next) {
    try {
      const bearer = req.headers["authorization"];
      if (!bearer) {
        return res.status(403).send({ message: "Access Denied!" });
      }
      const token = bearer.split(" ")[1]; // Getting the token from headers bearer
      req.token = token;
      next();
    } catch (err) {
      throw new Error(err);
    }
  },
  async checkUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await checkUser("id", id);
      if (!user) {
        return res
          .status(403)
          .send({ message: "There is no user with this id!" });
      }
      req.user = user;
      next();
    } catch (err) {
      throw new Error(err);
    }
  },
  async checkUserByEmail(req, res, next) {
    try {
      const { email } = req.body;
      const user = await checkUser("email", email);
      req.user = user;
      next();
    } catch (err) {
      throw new Error(err);
    }
  },
};
