import store from "../store/index.js";

export default {
  getAll(req, res) {
    const products = store.state().products;
    res.status(200).send(products);
  },
  getOne(req, res) {
    const { id } = req.params;
    try {
      const product = store.state().products.find((item) => item.id == id);
      if (!product) {
        return res.status(404).send({ message: "There is no product" });
      }
      res.status(200).send(product);
    } catch (err) {
      throw new Error(err);
    }
  },
};
