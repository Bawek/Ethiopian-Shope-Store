import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from '@/lib/apiConfig';

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getMerchants: builder.query({
      query: () => `auth/merchants/`,
      providesTags: ["Auth"],
    }),
    getMerchant: builder.query({
      query: (unique_id) => `auth/merchant/${unique_id}/`, // Ensure this endpoint matches your backend
      providesTags: ["Auth"],
    }),
    getAllOrders: builder.query({
      query: () => `order/all-orders/`,
      providesTags: ["Shop"],
    }),
    // Login mutation
    login: builder.mutation({
      query: (formData) => {
        return {
          url: "auth/login/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // Registration mutation
    register: builder.mutation({
      query: (formData) => ({
        url: "merchant/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMerchantQuery,
  useRegisterMutation,
  useGetMerchantsQuery,
  useGetAllOrdersQuery,
} = authSlice;
