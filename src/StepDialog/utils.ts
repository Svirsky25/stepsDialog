import { z } from "zod";
import type { Step } from "./types";

export const mergeStepsShapes = (steps: ReadonlyArray<Step>) => {
  const mergedShape: Record<string, z.ZodTypeAny> = {};

  for (const step of steps) {
    const shape = step.validationSchema.shape as Record<string, z.ZodTypeAny>;

    for (const key of Object.keys(shape)) {
      if (process.env.NODE_ENV !== "production" && mergedShape[key]) {
        throw new Error(`Duplicate field key across steps: "${key}"`);
      }

      mergedShape[key] = shape[key];
    }
  }

  return z.object(mergedShape);
};

export const extractStepsDefaultValues = (steps: ReadonlyArray<Step>) => {
  return steps.reduce<Record<string, unknown>>((acc, step) => {
    // Convert schema to partial, so fields without defaults won't throw errors
    const partialSchema = step.validationSchema.partial();
    const parsed = partialSchema.parse({}); // safe: fills defaults where defined

    return { ...acc, ...parsed };
  }, {});
};
