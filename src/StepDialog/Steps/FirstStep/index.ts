import z from "zod";
import type { Step } from "../../types";
import { Layout } from "./Layout";

export const firstStep = {
  id: "first",
  title: "first step",
  validationSchema: z.object({
    name: z.string().min(4, "Name must be at least 3 characters long"),
  }),
  layout: Layout,
} satisfies Step;
