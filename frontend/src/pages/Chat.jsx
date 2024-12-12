import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetChatsQuery,
  useAddMessageMutation,
  useResolveChatMutation,
  useCreateChatMutation,
} from "../redux/api/chatApiSlice";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useGetProductDetailsQuery } from "../redux/api/productApiSlice";

const Chat = () => {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: chats, isLoading, isError, refetch } = useGetChatsQuery();
  const [addMessage] = useAddMessageMutation();
  const [resolveChat] = useResolveChatMutation();
  const [createChat] = useCreateChatMutation();
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { productId, productName } = location.state || {};
  const { data: product } = useGetProductDetailsQuery(productId);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloaded");
    if (!hasReloaded) {
      localStorage.setItem("hasReloaded", "true");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    if (productId && product && !currentChat) {
      const existingChat = chats?.find(
        (chat) => chat.productId === productId && chat.user._id === userInfo._id
      );
      if (existingChat) {
        setCurrentChat(existingChat);
      } else {
        createChat({
          user: userInfo._id,
          seller: product.sellerId,
          chatSupport: "67593e76f214e298ad5d287e",
          productId,
          productName,
          message: "Hello",
        })
          .unwrap()
          .then((newChat) => {
            setCurrentChat(newChat);
            refetch();
          });
      }
    }
  }, [productId, product, chats, userInfo, createChat, currentChat, refetch]);

  const handleSendMessage = async () => {
    if (currentChat && message.trim()) {
      const newMessage = { chatId: currentChat._id, message };
      await addMessage(newMessage);
      setCurrentChat({
        ...currentChat,
        messages: [...currentChat.messages, { sender: userInfo, message }],
      });
      setMessage("");
    }
  };

  const handleResolveChat = async () => {
    if (currentChat) {
      await resolveChat({ chatId: currentChat._id });
      window.location.reload();
    }
  };

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
  };

  const sortedChats = chats
    ?.slice()
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const activeChats = sortedChats?.filter((chat) => !chat.resolved);
  const resolvedChats = sortedChats?.filter((chat) => chat.resolved);

  return (
    <div className="chat-container mt-[5rem] ml-[2rem] flex">
      <div className="chat-list w-1/4 pr-4">

        <div className="chat-list">
          {isLoading ? (
            <div>{t("Loading...")}</div>
          ) : isError ? (
            <div>{t("Error loading chats")}</div>
          ) : (
            <>
              <h2 className="text-xl font-semibold p-2">{t("Active Chats")}</h2>
              {activeChats.map((chat) => (
                <div
                  className={`p-2 m-2 rounded w-[20rem] ${
                    currentChat?._id === chat._id
                      ? "bg-dark-red-normal text-white"
                      : "bg-light-gray hover:bg-light-lightRed"
                  }`}
                  key={chat._id}
                  onClick={() => handleChatClick(chat)}
                >
                  {chat.user.username} - {chat.seller.username} -{" "}
                  {chat.chatSupport.username} -{" "}
                  {chat.resolved ? "Resolved" : "Active"}
                </div>
              ))}

              <br></br>

              <h2 className="text-xl font-semibold p-2">
                {t("Resolved Chats")}
              </h2>
              {resolvedChats.map((chat) => (
                <div
                  className={`p-2 m-2 rounded w-[20rem] ${
                    currentChat?._id === chat._id
                      ? "bg-dark-red-normal text-white"
                      : "bg-light-gray hover:bg-light-lightRed"
                  }`}
                  key={chat._id}
                  onClick={() => handleChatClick(chat)}
                >
                  {chat.user.username} - {chat.seller.username} -{" "}
                  {chat.chatSupport.username} -{" "}
                  {chat.resolved ? "Resolved" : "Active"}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="chat-product w-3/4">
        <div className="chat-header">
          {currentChat ? (
            <>
              <h1 className="text-xl font-semibold">
                {currentChat.productName}
              </h1>
            </>
          ) : (
            <h1 className="text-xl">{productName}</h1>
          )}
        </div>
        {currentChat &&
          (userInfo.isSeller || userInfo.isChatSupport) &&
          !currentChat.resolved && (
            <button
              onClick={handleResolveChat}
              className="bg-red-500 text-white py-2 px-4 rounded mb-3"
            >
              {t("Mark as resolved")}
            </button>
          )}
        <div className="chat-messages">
          {currentChat ? (
            <>
              <div className="messages">
                {currentChat.messages.map((msg) => (
                  <div key={msg._id}>
                    <strong>{msg.sender.username}:</strong> {msg.message}
                  </div>
                ))}
              </div>
              {!currentChat.resolved && (
                <div className="message-input flex flex-col gap-2 w-[20rem]">
                  <textarea
                    className="p-2 border rounded-lg focus:outline-none resize-none overflow-hidden"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      e.target.style.height = "auto"; // Reset height to calculate the new height
                      e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height to fit content
                    }}
                    placeholder={t("Type a message...")}
                  />

                  <button
                    className="p-2 border rounded-lg bg-dark-red-normal text-light-white hover:bg-dark-red-hover"
                    onClick={handleSendMessage}
                  >
                    {t("Send")}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-2 m-2 text-dark-gray text-opacity-65">
              {t("Select a chat to view messages")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
