import { appApi } from "@/lib/appApi";

export const accountApi = appApi.injectEndpoints({
    // tagTypes: ["Account"],
    overrideExisting: true,
    endpoints: (builder) => ({
        getMerchants: builder.query({
            query: () => `/merchants/`,
        }),
        getAccountAndLocation: builder.query({
            query: (id) => `/accounts/get-account-location/${id}`,
        }),
        getMerchant: builder.query({
            query: (unique_id) => `Account/merchant/${unique_id}/`, // Ensure this endpoint matches your backend
            // providesTags: ["Account"],
        }),
        // Login mutation
        login: builder.mutation({
            query: (formData) => {
                return {
                    url: "/accounts/login",
                    method: "POST",
                    body: formData,
                };
            },
            // invalidatesTags: ["Account"],
        }),
        logout: builder.mutation({
            query: () => {
                return {
                    url: "/accounts/logout",
                    method: "POST",
                };
            },
        }),
        // Registration mutation
        registerAccount: builder.mutation({
            query: (formData) => ({
                url: "/accounts/register",
                method: "POST",
                body: formData,
            }),
            // invalidatesTags: ["Account"],
        }),
        requirePasswordChange: builder.mutation({
            query: (email) => ({
                url: `/accounts/require-change/${email}`,
                method: "POST",
            }),
        }),

        changePassword: builder.mutation({
            query: (formData) => ({
                url: `/accounts/password-change/${formData.token}`,
                method: "POST",
                body: formData,
            }),
        }),
        // update Accout mutation
        updateAccount: builder.mutation({
            query: (formData) => {
                console.log(formData, 'form data se')
                return {
                    url: `/accounts/update/${formData.id}`,
                    method: "POST",
                    body: formData.formData,
                }
            },
            // invalidatesTags: ["Account"],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetMerchantQuery,
    useRegisterAccountMutation,
    useGetMerchantsQuery,
    useLogoutMutation,
    useUpdateAccountMutation,
    useGetAccountAndLocationQuery,
    useRequirePasswordChangeMutation,
    useChangePasswordMutation
} = accountApi;
