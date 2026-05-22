import { z } from "zod";

// Define schema for validation based on fields array
export const merchantRegistrationSchema = z.object({
    TradeLicence: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    shopLogo: z.string({
        message: "Please enter a valid email address",
    })
});
