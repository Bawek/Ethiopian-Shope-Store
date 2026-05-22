import { appApi } from "@/lib/appApi";
import { baseUrl } from "../cart/cartSlice";
export const paymentApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        verifyPayment: builder.mutation({
            query: (tx_ref) => ({
                url: `${baseUrl}/templates/payment/frontend-check?tx_ref=${tx_ref}`,
                method: "GET",
            }),
        }),
        initiatePayment: builder.mutation({
            query: (paymentData) => ({
                url: "/pay",
                method: "POST",
                body: paymentData
            }),
        }),
    }),
});

export const { useInitiatePaymentMutation, useVerifyPaymentMutation } = paymentApi;