import express from "express";

import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRole, isAuthenticatedUser } from "../middleware/auth.js";
import {
  createProductReview,
  deleteProductReview,
  getAllReviewsOfProduct,
} from "../controllers/userController.js";

export const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProduct);

router.route("/product/:id").get(getSingleProduct);

router.route("/product/reviews").put(isAuthenticatedUser, createProductReview);

router.route("/product/reviews/:id").get(getAllReviewsOfProduct);
router
  .route("/product/reviews")
  .delete(isAuthenticatedUser, deleteProductReview);
export default router;
