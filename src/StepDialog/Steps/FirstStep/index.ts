import z from "zod";
import type { Step } from "../../types";
import { Layout } from "./Layout";

export const firstStep = {
  id: "first",
  title: "first step",
  validationSchema: z.object({
    name: z.string().min(0, "name is required").default("Bob"),
  }),
  layout: Layout,
} satisfies Step;
