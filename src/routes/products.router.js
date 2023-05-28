import express from "express";
import productsController from "../controllers/products.controller.js";

const router = express();

router.get("/products", productsController.getAll);
router.get("/products/:id", productsController.getOne);

export default router;
