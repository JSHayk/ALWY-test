import express from "express";
import generalMiddleware from "../middlewares/general.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authController from "../controllers/auth.controller.js";

const router = express();
router.post(
  "/register",
  generalMiddleware.checkEmptyBody,
  authMiddleware.checkBody,
  authMiddleware.checkValidation,
  authMiddleware.checkUserByEmail,
  authController.register
);
router.post(
  "/login",
  generalMiddleware.checkEmptyBody,
  authMiddleware.checkBody,
  authMiddleware.checkValidation,
  authMiddleware.checkUserByEmail,
  authController.login
);
router.get("/logout", authController.logout);

export default router;
