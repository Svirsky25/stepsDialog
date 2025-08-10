import { z, type ZodRawShape } from "zod";
import type { Step } from "./types";

export const mergeStepsShapes = (steps: Step[]) => {
  const mergedShape: Record<string, z.ZodTypeAny> = {};

  steps.forEach((step) => {
    const shape = step.validationSchema.shape as Record<string, z.ZodTypeAny>;
    Object.assign(mergedShape, shape);
  });

  return z.object(mergedShape as ZodRawShape);
};

export const extractStepsDefaultValues = (steps: Step[]) => {
  return steps.reduce<Record<string, unknown>>((acc, step) => {
    // Convert schema to partial, so fields without defaults won't throw errors
    const partialSchema = step.validationSchema.partial();
    const parsed = partialSchema.parse({}); // safe: fills defaults where defined
    return { ...acc, ...parsed };
  }, {});
};
