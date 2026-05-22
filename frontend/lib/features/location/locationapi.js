import { appApi } from "@/lib/appApi";

export const locationApi = appApi.injectEndpoints({
    // tagTypes: ["Location"], // Tag for location-related endpoints
    endpoints: (builder) => ({
        getLocation: builder.query({
            query: (id) => `/location/get/${id}`,
            // providesTags: (result, error, id) => [{ type: 'Location', id }], // Provides the location data tag with the ID
        }),
        registerLocation: builder.mutation({
            query: (formData) => {
                console.log(formData); // Log formData
                return {
                    url: '/location/register',
                    method: 'POST',
                    body: formData,
                };
            },
            // invalidatesTags: [{ type: 'Location' }], // Invalidates Location tag to trigger refetch
        }),

    }),
});

export const {
    useGetLocationQuery,
    useRegisterLocationMutation,
} = locationApi;
