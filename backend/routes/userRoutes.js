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
  getAllPincodes,
  deleteAdminAndResetSellers,
  getAllAdmins,
  verifyEmail,
  verifyOTP,
} from "../controllers/userController.js";

import {
  authenticate,
  authorizeAdmin,
  authorizeSuperAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// USER ROUTES

router.post('/register', createUser);
router.post('/verify-otp', verifyOTP);
router.get('/verify-email', verifyEmail);
router
  .route("/")
  .post(createUser)
  .get(authenticate, getAllUsers);

router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

// Pincode route
router.route("/pincodes").get(authenticate, getAllPincodes);

//ADMIN ROUTES
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

router
  .route("/registerAdmin")
  .post(authenticate, authorizeSuperAdmin, registerAdmin);

router
  .route("/admin/:adminId")
  .delete(authenticate, authorizeSuperAdmin, deleteAdminAndResetSellers);

export default router;
