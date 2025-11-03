import { z } from "zod";
import React from "react";
import type { Step, StepLayoutProps } from "./types";

export const mergeStepsShapes = (steps: readonly Step[]) => {
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

export const extractStepsDefaultValues = (steps: readonly Step[]) => {
  return steps.reduce<Record<string, unknown>>((acc, step) => {
    // Convert schema to partial, so fields without defaults won't throw errors
    const partialSchema = step.validationSchema.partial();
    const parsed = partialSchema.parse({}); // safe: fills defaults where defined

    return { ...acc, ...parsed };
  }, {});
};

export const extractStepsFromChildren = (children: React.ReactNode): Step[] => {
  const steps: Step[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props) {
      const { id, title, validationSchema, children: jsxElement } = child.props;
      if (id && title && validationSchema && jsxElement) {
        // Create a wrapper component that clones the JSX element with the required props
        const LayoutWrapper: React.FC<StepLayoutProps> = (stepLayoutProps) => {
          if (React.isValidElement(jsxElement)) {
            // Clone the JSX element and merge its existing props with StepLayoutProps
            // StepLayoutProps take priority to ensure proper dialog functionality
            const existingProps = jsxElement.props || {};
            return React.cloneElement(jsxElement, { ...existingProps, ...stepLayoutProps });
          }
          return jsxElement as React.ReactElement;
        };

        steps.push({
          id,
          title,
          validationSchema,
          layout: LayoutWrapper,
        });
      }
    }
  });

  return steps;
};
