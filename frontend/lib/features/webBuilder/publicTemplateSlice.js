import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const publicTemplateSlice = createApi({
  reducerPath: "publiwebBuilder",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/template/",
  }),
  tagTypes: ["WebBuilders"],
  endpoints: (builder) => ({
    getShops: builder.query({
      query: () => "getshops/",
      providesTags: ["Shop"],
    }),
    getshop: builder.query({
      query: (shopId) => `getshop/${shopId}/`,
      providesTags: ["WebBuilders"],
    }),
    getshopMerchant: builder.query({
      query: (merchantId) => `getshopbymerchant/${merchantId}/`,
      providesTags: ["WebBuilders"],
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetshopQuery,
  useGetshopMerchantQuery,
} = publicTemplateSlice;