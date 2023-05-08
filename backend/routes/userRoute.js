import express from "express";
import { Router } from "express";
import { authorizeRole, isAuthenticatedUser } from "../middleware/auth.js";
import {
  deleteUserByAdmin,
  forgotPassword,
  getAllUsersAdmin,
  getUserDetail,
  getUserDetailAdmin,
  loginUser,
  logout,
  registerUser,
  updateUser,
  updateUserPassword,
  updateUserRoleByAdmin,
} from "../controllers/userController.js";

export const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetail);
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);
router.route("/me/update").put(isAuthenticatedUser, updateUser);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUsersAdmin);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getUserDetailAdmin)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateUserRoleByAdmin)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUserByAdmin);

export default router;
