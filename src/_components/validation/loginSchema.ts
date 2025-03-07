"use client";

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ message: "Enter your email" }).email("Enter a valid email"),
  password: z
    .string({ message: "Enter your password" })
    .min(6, { message: "password must be at least 6" }),
});
