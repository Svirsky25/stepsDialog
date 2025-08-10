import z from "zod";
import type { Step } from "../../types";
import { Layout } from "./Layout";

export const thirdStep = {
  id: "third",
  title: "third step",
  validationSchema: z.object({}),
  layout: Layout,
} satisfies Step;
