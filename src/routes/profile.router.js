import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import profileController from "../controllers/profile.controller.js";

const router = express();
router.get(
  "/profile/:id",
  authMiddleware.checkToken,
  authMiddleware.checkUserById,
  profileController.getAll
);
router.get(
  "/profile/:id/orders",
  authMiddleware.checkToken,
  authMiddleware.checkUserById,
  profileController.getOrders
);
router.get(
  "/profile/:id/wish-list",
  authMiddleware.checkToken,
  authMiddleware.checkUserById,
  profileController.getWishList
);
// Adding new item in wish-list
router.post(
  "/profile/wish-list/:id/:productId",
  authMiddleware.checkToken,
  authMiddleware.checkUserById,
  profileController.addWishList
);
export default router;
