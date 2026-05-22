import { appApi } from "@/lib/appApi";

export const MerchantRegistrationApi = appApi.injectEndpoints({
    tagTypes: ["MerchantRegistration"],
    endpoints: (builder) => ({
        getAllMerchants: builder.query({
            query: () => `/merchant/get-all`,
            // providesTags: ["MerchantRegistration"],
        }),
        getMerchantDashboardInfo: builder.query({
            query: (merchantId) => `/merchant-dashboard/${merchantId}`,
            // providesTags: ["MerchantRegistration"],
        }),
        getMerchantAnalytics: builder.query({
            query: (merchantId, startDate, endDate) => `/merchant-analytics/${merchantId}?startDate=${startDate}&endDate=${endDate}`,
            // providesTags: ["MerchantRegistration"],
        }),
        getMerchantById: builder.query({
            query: (merchantId) => `merchant/get/${merchantId}/`,
        }),
        getMerchantByAccount: builder.query({
            query: (accountId) => `/merchant/getby-account/${accountId}/`,
        }),
        // Login mutation
        registerMerchant: builder.mutation({
            query: (formData) => {
                return {
                    url: "/merchant/register",
                    method: "POST",
                    body: formData,
                };
            },
            // invalidatesTags: ["MerchantRegistration"],
        }),
        // change merchant status
        changeMerchantStatus: builder.mutation({
            query: (data) => {
                console.log('data ', data)
                return {
                    url: `/merchant/updateStatus/${data.id}`,
                    method: "PUT",
                    body: data
                };
            },
            // invalidatesTags: ["MerchantRegistration"],
        }),
        deleteMerchant: builder.mutation({
            query: (id) => ({
                url: `/merchant/delete/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useRegisterMerchantMutation,
    useGetAllMerchantsQuery,
    useGetMerchantByIdQuery,
    useDeleteMerchantMutation,
    useChangeMerchantStatusMutation,
    useGetMerchantDashboardInfoQuery,
    useGetMerchantByAccountQuery,
    useGetMerchantAnalyticsQuery,
} = MerchantRegistrationApi;
