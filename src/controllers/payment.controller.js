import paymentService from "../services/payment.service.js";

export default {
  async checkout(req, res) {
    const { id, productId } = req.params;
    try {
      const { sc, message } = await paymentService.checkout(id, productId);
      res.status(sc).send({ message });
    } catch (err) {
      throw new Error(err);
    }
  },
};
