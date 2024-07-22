import express from "express";
import {
  registerSeller,
  checkSellerRegistration,
  acceptSeller,
  getSellerByUserId,
} from "../controllers/sellerRegistrationController.js";
import {
  getAllSellerApplications,
  toggleSellerStatus,
} from "../controllers/sellerApplicationController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Set up storage options for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadsDOC/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.route("/").post(
  upload.fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "pan", maxCount: 1 },
  ]),
  registerSeller
);
router.route("/check-seller-registration").get(checkSellerRegistration);
router.route("/all").get(getAllSellerApplications);
router.route("/toggle-seller-status").post(toggleSellerStatus);
router.post("/seller/accept", authenticate, authorizeAdmin, acceptSeller);
router.get("/user/:userId", getSellerByUserId);
export default router;
