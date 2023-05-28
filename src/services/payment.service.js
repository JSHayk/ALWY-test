import connect from "../db/connect.js";
import invalidArguments from "../helpers/invalidArguments.js";

export default {
  async checkout(userId, productId) {
    invalidArguments([userId, productId]);
    try {
      await connect.query(
        "INSERT INTO orders (user_id, product_id) VALUES (?, ?)",
        [userId, productId]
      );
      return {
        sc: 200,
        message: "Successfully Bought",
      };
    } catch (err) {
      throw new Error(err);
    }
  },
};
