import { z, type ZodRawShape } from "zod";
import type { Step } from "./types";

export const mergeSchemas = (steps: Step[]) => {
  let mergedShape: ZodRawShape = {};

  steps.forEach((step) => {
    mergedShape = { ...mergedShape, ...step.validationSchema.shape };
  });

  return z.object(mergedShape);
};
