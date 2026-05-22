import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/lib/apiConfig';
import { logOut, setCredential } from './features/auth/accountSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().account.accessToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // Check if the error is 403 (Unauthorized), usually for expired token
    if (result.error?.originalStatus === 403) {
        // Try to refresh the token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);

        if (refreshResult?.data) {
            const email = api.getState().account.email; // Preserve the email in state
            api.dispatch(setCredential({ ...refreshResult.data, email }));

            // Retry the original request after updating credentials
            result = await baseQuery(args, api, extraOptions); // Wait for the result of the retried request
        } else {
            // Log out if refreshing the token fails
            api.dispatch(logOut());
        }
    }

    return result;
};

export const appApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});
