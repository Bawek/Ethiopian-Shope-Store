import { appApi } from "@/lib/appApi";

export const merchantTemplateApi = appApi.injectEndpoints({
    tagTypes: ["MerchantTemplate", "CustomPage"], // Added CustomPage tag type
    overrideExisting: true,
    endpoints: (builder) => ({
        // ======================
        // Merchant Template Endpoints
        // ======================
        getAllMerchantTemplates: builder.query({
            query: () => '/merchantTemplates/get-all'
        }),
        getMerchantTemplateByDomain: builder.query({
            query: (domain) => `/merchantTemplates/merchant-template/${domain}`,
            // providesTags: (result, error, id) => [{ type: 'Location', id }],
        }),
        getMerchantTemplateById: builder.query({
            query: (id) => `/merchantTemplates/get-merchantTemplates-byId/${id}`,
            // providesTags: (result, error, id) => [{ type: 'Location', id }],
        }),
        getMerchantTemplatesByAccount: builder.query({
            query: (accountId) => `/merchantTemplates/merchant-by-account/${accountId}`,
            // providesTags: (result, error, id) => [{ type: 'Location', id }],
        }),
        changeMerchantTemplate: builder.mutation({
            query: (id) => ({
                url: `merchantTemplates/change-template/${id}`,
                method: "GET",
            }),
            // invalidatesTags: ["Shop"],
        }),

        // ======================
        // Custom Page Endpoints
        // ======================
        createCustomPage: builder.mutation({
            query: (data) => ({
                url: '/customized-pages/create',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["CustomPage"],
        }),
        getCustomPagesByTemplate: builder.query({
            query: (merchantTemplateId) => `/customized-pages/get-by-template/${merchantTemplateId}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'CustomPage', id })),
                        { type: 'CustomPage', id: 'LIST' },
                    ]
                    : [{ type: 'CustomPage', id: 'LIST' }],
        }),
        getCustomPageById: builder.query({
            query: (id) => `/customized-pages/get-by-id/${id}`,
            providesTags: (result, error, id) => [{ type: 'CustomPage', id }],
        }),
        updateCustomPage: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/customized-pages/update/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'CustomPage', id }],
        }),
        deleteCustomPage: builder.mutation({
            query: (id) => ({
                url: `/customized-pages/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'CustomPage', id }],
        }),
    }),
});

export const {
    // Merchant Template hooks
    useGetAllMerchantTemplatesQuery,
    useChangeMerchantTemplateMutation,
    useGetMerchantTemplateByDomainQuery,
    useGetMerchantTemplatesByAccountQuery,
    useGetMerchantTemplateByIdQuery,

    // Custom Page hooks
    useCreateCustomPageMutation,
    useGetCustomPagesByTemplateQuery,
    useGetCustomPageByIdQuery,
    useUpdateCustomPageMutation,
    useDeleteCustomPageMutation
} = merchantTemplateApi;