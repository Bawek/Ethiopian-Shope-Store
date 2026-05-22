import { appApi } from "@/lib/appApi";

export const shopApi = appApi.injectEndpoints({
  tagTypes: ["Shop"],
  overrideExisting:true,
  endpoints: (builder) => ({
    getAllShops: builder.query({
      query: () => '/shops/get-all'
    }),
    getShop: builder.query({
      query: (shopId) => `/shops/get/${shopId}`,
      // providesTags: ["customisedPage"],
    }),
    getShopByMerchantTemplateId: builder.query({
      query: (templateId) => `/shops/getby-merchant-template/${templateId}`,
    }),
    getShopByAccount: builder.query({
      query: (accountId) => `/shops/getby-account/${accountId}`,
      // providesTags: ["customisedPage"],
    }),
    getShopWithId: builder.query({
      query: (shopId) => `getshop-id/${shopId}/`,
      // providesTags: ["Shop"],
    }),
    createShop: builder.mutation({
      query: (formData) => ({
        url: "/shops/register",
        method: "POST",
        body: formData
      }),
      // invalidatesTags: ["Shop"],
    }),
    updateById: builder.mutation({
      query: (data) => ({
        url: `/shops/update/${data.id}`,
        method: "PUT",
        body: data
      }),
    }),
  }),
});
export const {
  useCreateShopMutation,
  useGetShopByAccountQuery,
  useGetShopByMerchantTemplateIdQuery,
  useGetAllShopsQuery,
  useGetShopQuery,
  useUpdateByIdMutation
} = shopApi;

