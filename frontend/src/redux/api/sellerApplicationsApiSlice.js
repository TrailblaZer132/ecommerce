import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sellerAplicationApi = createApi({
  reducerPath: 'sellerAplicationApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/seller-registrations' }),
  endpoints: (builder) => ({
    getSellerApplications: builder.query({
      query: () => '/all',
    }),
    toggleSellerStatus: builder.mutation({
      query: (email) => ({
        url: '/toggle-seller-status',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const { useGetSellerApplicationsQuery, useToggleSellerStatusMutation } = sellerAplicationApi;




