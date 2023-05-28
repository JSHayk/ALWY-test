import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import paymentController from "../controllers/payment.controller.js";

const router = express();
router.post(
  "/checkout/:id/:productId",
  authMiddleware.checkToken,
  authMiddleware.checkUserById,
  paymentController.checkout
);

export default router;
