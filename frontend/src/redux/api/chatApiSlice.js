import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/chats" }),
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => "/",
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "/message",
        method: "POST",
        body: data,
      }),
    }),
    resolveChat: builder.mutation({
      query: (data) => ({
        url: "/resolve",
        method: "POST",
        body: data,
      }),
    }),
    createChat: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetChatsQuery,
  useAddMessageMutation,
  useResolveChatMutation,
  useCreateChatMutation,
} = chatApi;
