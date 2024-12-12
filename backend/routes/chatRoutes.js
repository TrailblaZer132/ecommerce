import express from "express";
import {
  createChat,
  getChats,
  addMessage,
  resolveChat,
} from "../controllers/chatController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authenticate, createChat).get(authenticate, getChats);
router.route("/message").post(authenticate, addMessage);

router.route("/resolve").post(authenticate, resolveChat);

export default router;