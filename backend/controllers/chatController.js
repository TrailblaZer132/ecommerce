import asyncHandler from "../middlewares/asyncHandler.js";
import Chat from "../models/chatModel.js";

const createChat = asyncHandler(async (req, res) => {
  const { user, seller, chatSupport, message, productId, productName } =
    req.body;

  const chat = await Chat.create({
    user,
    seller,
    chatSupport,
    productId,
    productName,
    messages: [{ sender: req.user._id, message }],
  });

  res.status(201).json(chat);
});

const getChats = asyncHandler(async (req, res) => {
  const chats = await Chat.find({
    $or: [
      { user: req.user._id },
      { seller: req.user._id },
      { chatSupport: req.user._id },
    ],
  })
    .populate("user", "username")
    .populate("seller", "username")
    .populate("chatSupport", "username")
    .populate("messages.sender", "username");

  res.json(chats);
});

const addMessage = asyncHandler(async (req, res) => {
  const { chatId, message } = req.body;

  const chat = await Chat.findById(chatId);

  if (chat) {
    chat.messages.push({ sender: req.user._id, message });
    await chat.save();
    res.json(chat);
  } else {
    res.status(404);
    throw new Error("Chat not found");
  }
});

const resolveChat = asyncHandler(async (req, res) => {
  const { chatId } = req.body;

  const chat = await Chat.findById(chatId);

  if (chat) {
    chat.resolved = true;
    await chat.save();
    res.json({ message: "Chat resolved" });
  } else {
    res.status(404);
    throw new Error("Chat not found");
  }
});

export { createChat, getChats, addMessage, resolveChat };
