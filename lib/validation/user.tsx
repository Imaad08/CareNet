import * as z from "zod";

export const UserValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  username: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  bio: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(1000, { message: "Maximum 1000 caracters." }),
  phone: z
    .string()
    .min(10, { message: "Minimum 10 digits." })
    .max(10, { message: "Maximum 10 digits." }),
  resume: z
    .string()
    .min(0, { message: "Minimum 0 digits." })
    .max(100000, { message: "Maximum 100000 digits." }),
});