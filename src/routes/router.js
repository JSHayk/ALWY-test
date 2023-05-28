import express from "express";
// Routes
import productsRouter from "./products.router.js";
import authRouter from "./auth.router.js";
import profileRouter from "./profile.router.js";
import paymentRouter from "./payment.router.js";

const router = express();
router.use(productsRouter);
// router.use(authRouter);
// router.use(profileRouter);
// router.use(paymentRouter);

export default router;
