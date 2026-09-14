import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/apiConfig";

export const publicShopSlice = createApi({
  reducerPath: "publicShop",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/shops`,
  }),
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    getShops: builder.query({
      query: () => "/get-all",
      providesTags: ["Shop"],
    }),
    getshop: builder.query({
      query: (shopId) => `get/${shopId}/`,
    }),
    getshopMerchant: builder.query({
      query: (merchantId) => `getshopbymerchant/${merchantId}/`,
    }),
    getshopCategory: builder.query({
      query: () => `shopCategory/`,
    }),

  }),
});

export const {
  useGetShopsQuery,
  useGetshopQuery,
  useGetshopMerchantQuery,
  useGetshopCategoryQuery
} = publicShopSlice;