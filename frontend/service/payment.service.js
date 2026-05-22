'use client'
import { useToast } from "@/hooks/use-toast";
import { useInitiatePaymentMutation } from "@/lib/features/payment/paymentsApis";
import { useCallback } from "react";

export const useProcessPayment = () => {
    const { toast } = useToast();
    const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();
    const processPayment = useCallback(
        async (paymentData) => {
            try {
                const response = await initiatePayment(paymentData).unwrap();
                console.log(response,'last reponse')
                if (response?.checkout_url) {
                    toast({
                        title: "Redirecting to Payment",
                        description: "You will be redirected to the payment gateway...",
                    });

                    // Redirect to payment page
                    window.location.href = response.checkout_url;
                } else {
                    toast({
                        title: "Payment Failed",
                        description: "Could not retrieve payment link.",
                        variant: "destructive",
                    });
                }
            } catch (error) {
                toast({
                    title: "Payment Error",
                    description:
                        error?.data?.message || error?.message || "Something went wrong during payment.",
                    variant: "destructive",
                });
                console.log("Paymenhht error:", error);
            }
        },
        [initiatePayment, toast]
    );

    return { processPayment, isLoading };
};
