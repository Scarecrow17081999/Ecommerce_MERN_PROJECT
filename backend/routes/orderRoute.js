import express from "express";
import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrders,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authorizeRole, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router
  .route("/orders/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleOrders);
router.route("/orders/me").get(isAuthenticatedUser, getUserOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllOrders);
router
  .route("/admin/orders/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder);
export default router;
