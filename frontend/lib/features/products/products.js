import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from '@/lib/apiConfig';

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `/products/get-all-products`,
      providesTags: ["product"],
    }),
    getProductsForSale: builder.query({
      query: () => `/products/get-all-products-for-sale`,
      providesTags: ["product"],
    }),
    getProductsById: builder.query({
      query: (id) => `/products/product-get-by-id/${id}/`,
      providesTags: ["product"],
    }),
    getProductsByShopId: builder.query({
      query: (id) => `/products/product-get-by-ShopId/${id}/`,
      providesTags: ["product"],
    }),
    getOutOfStockProducts: builder.query({
      query: (merchant_id) => `product/stock/${merchant_id}/`,
      providesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: `/products/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/products/update`,
          method: "PUT",
          body: data // Accepting an array of new products
        }
      },
      invalidatesTags: ["product"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
  useGetOutOfStockProductsQuery,
  useGetProductsByIdQuery,
  useGetProductsForSaleQuery,
  useGetProductsByShopIdQuery
} = productsApi;
