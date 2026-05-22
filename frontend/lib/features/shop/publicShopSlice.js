// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const publicShopSlice = createApi({
//   reducerPath: "publicShop",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8000/api/shops",
//   }),
//   tagTypes: "Shop",
//   endpoints: (builder) => ({
//     getShops: builder.query({
//       query: () => "/get-all",
//       providesTags: "Shop",
//     }),
//     getshop: builder.query({
//       query: (shopId) => `get/${shopId}/`,
//     }),
//     getshopMerchant: builder.query({
//       query: (merchantId) => `getshopbymerchant/${merchantId}/`,
//     }),
//     getshopCategory: builder.query({
//       query: () => `shopCategory/`,
//     }),

//   }),
// });

// export const {
//   useGetShopsQuery,
//   useGetshopQuery,
//   useGetshopMerchantQuery,
//   useGetshopCategoryQuery
// } = publicShopSlice;