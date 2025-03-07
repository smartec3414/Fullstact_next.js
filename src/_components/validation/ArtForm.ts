"use client";

import { z } from "zod";

export const ArtAddSchema = z.object({
  title: z.string({ message: "Enter article title" }).min(3, {
    message: "title must be at least 3 characters long",
  }),
  desc: z.string({ message: "Enter article description" }).min(3, {
    message: "description must be at least 3 characters long",
  }),
});
