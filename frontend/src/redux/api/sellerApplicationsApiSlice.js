import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sellerAplicationApi = createApi({
  reducerPath: "sellerAplicationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/seller-registrations" }),
  endpoints: (builder) => ({
    getSellerApplications: builder.query({
      query: () => "/all",
    }),
    toggleSellerStatus: builder.mutation({
      query: (email) => ({
        url: "/toggle-seller-status",
        method: "POST",
        body: { email },
      }),
    }),
    
    acceptSeller: builder.mutation({
      query: (userId) => ({
        url: "/seller/accept",
        method: "POST",
        body: { userId },
      }),
    }),
  }),
});

export const { useGetSellerApplicationsQuery,useGetSellerByIdQuery, useToggleSellerStatusMutation, useAcceptSellerMutation } = sellerAplicationApi;




