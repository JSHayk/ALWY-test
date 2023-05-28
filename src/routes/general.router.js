import express from "express";

const router = express();

["get", "post", "delete", "put"].forEach((method) => {
  router[method]("*", notFound);
});

function notFound(req, res) {
  return res.status(404).send("Not Found!");
}

export default router;
