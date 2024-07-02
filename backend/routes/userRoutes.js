import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  registerAdmin,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin,authorizeSuperAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//USER ROUTES
router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin,getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

//ADMIN ROUTES
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

router.route("/registerAdmin").post(authenticate, authorizeSuperAdmin, registerAdmin);

export default router;
