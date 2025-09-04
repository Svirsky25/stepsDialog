import { z } from "zod";
import type { Step } from "../../types";
import { Layout } from "./Layout";

export const secondStep = {
  id: "second",
  title: "second step",
  validationSchema: z.object({
    age: z.number().min(4, "Age must be at least 4").default(8),
  }),
  layout: Layout,
} satisfies Step;
