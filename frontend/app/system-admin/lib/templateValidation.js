import { z } from "zod";

// Define schema for validation based on fields array
export const pageSchema = z.object({
    name: z.string().min(1, {
        message: "Page name is required",
    }),

    status: z.enum(["ACTIVE", "SUSPENDED", "PENDING"], {
        errorMap: () => {
            return { message: "Status must be one of ACTIVE, SUSPENDED, or PENDING" };
        },
    }),

    previewUrls: z.instanceof(File).optional(),

    basePrice: z.string().min(1, {
        message: "Price is required",
    }),

    description: z.string().min(1, {
        message: "Description is required",
    }),
});
