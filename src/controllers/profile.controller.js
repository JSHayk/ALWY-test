import profileService from "../services/profile.service.js";

export default {
  async getAll(req, res) {
    try {
      const { sc, message, data } = await profileService.getAll(
        req.token,
        req.user
      );
      res.status(sc).send((data && data.user) || { message });
    } catch (err) {
      throw new Error(err);
    }
  },
  async getOrders(req, res) {
    const { id } = req.params;
    try {
      const { sc, message, data } = await profileService.getOrders(id);
      res.status(sc).send((data && data.orders) || { message });
    } catch (err) {
      throw new Error(err);
    }
  },
  async getWishList(req, res) {
    const { id } = req.params;
    try {
      const { sc, message, data } = await profileService.getWishList(id);
      res.status(sc).send((data && data.wish_list) || { message });
    } catch (err) {
      throw new Error(err);
    }
  },
  async addWishList(req, res) {
    const { id, productId } = req.params;
    try {
      const { sc, message } = await profileService.addWishList(id, productId);
      res.status(sc).send({ message });
    } catch (err) {
      throw new Error(err);
    }
  },
};
