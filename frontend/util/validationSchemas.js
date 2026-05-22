import { z } from "zod";

// account registration validation schema
export const accountRegistrationSchema = z.object({
    firestName: z.string().min(2, {
        message: "Firest name is required",
    }),
    lastName: z.string().min(2, {
        message: "Last name is required",
    }),
    email: z.string().email({ message: 'email must be valid' }),
    password: z.string().min(4, {
        message: "password must be atleast four",
    }),
});
// account login validation schema
export const accountLoginSchema = z.object({
    email: z.string().email({ message: 'email must be valid' }),
    password: z.string().min(4, {
        message: "password must be atleast four",
    }),
});

