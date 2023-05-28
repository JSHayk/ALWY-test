import store from "../store/index.js";
import connect from "../db/connect.js";
import tokenService from "./token.service.js";
import userDto from "../dtos/user.dto.js";
import invalidArguments from "../helpers/invalidArguments.js";

export default {
  async getAll(token, user) {
    invalidArguments([token, user]);
    try {
      const generatedUser = tokenService.verify(token);
      if (!generatedUser) {
        return {
          sc: 403,
          message: "Invalid Token!",
        };
      }
      if (generatedUser.id !== user.id) {
        return {
          sc: 401,
          message: "Don't have access to another data!",
        };
      }
      return {
        sc: 200,
        data: {
          user: userDto(user),
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async getOrders(userId) {
    try {
      const [orders] = await connect.query(
        "SELECT * FROM orders WHERE user_id = ?",
        [userId]
      );
      if (orders.length === 0) {
        return {
          sc: 404,
          message: "There is no order!",
        };
      }
      const products = getProducts(orders);
      return {
        sc: 200,
        data: {
          orders: products,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async getWishList(userId) {
    try {
      const [wish_list] = await connect.query(
        "SELECT * FROM wish_list WHERE user_id = ?",
        [userId]
      );
      if (wish_list.length === 0) {
        return {
          sc: 404,
          message: "The WishList is empty!",
        };
      }
      const products = getProducts(wish_list);
      return {
        sc: 200,
        data: {
          wish_list: products,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  },
  async addWishList(userId, productId) {
    invalidArguments([userId, productId]);
    try {
      await connect.query(
        "INSERT INTO wish_list (user_id, product_id) VALUES (?, ?)",
        [userId, productId]
      );
      return {
        sc: 200,
        message: "Successfully added to wish-list",
      };
    } catch (err) {
      throw new Error(err);
    }
  },
};

function getProducts(data) {
  const products = store.state().products;
  const result = [];
  data.forEach((item) => {
    const found = products.find((product) => product.id === item.product_id);
    if (found) {
      result.push(found);
    }
  });
  return result;
}
