"use client";

import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ message: "Enter your username" })
    .min(3, { message: "username must be at least 3 characters long" }),
  email: z.string({ message: "Enter your email" }).email("Enter a valid email"),
  password: z
    .string({ message: "Enter your password" })
    .min(6, { message: "password must be at least 6" }),
});
