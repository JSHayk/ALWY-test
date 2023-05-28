export default {
  checkEmptyBody(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ ms: "The request body is empty!" });
    }
    next();
  },
};
