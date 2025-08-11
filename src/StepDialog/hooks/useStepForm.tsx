// useStepForm.ts
import { useFormContext, type Path, type UseFormReturn } from "react-hook-form";
import type { AllFormValues, Step } from "../types";
import { useMemo } from "react";

export const useStepForm = <T extends Step | readonly Step[]>(): UseFormReturn<
  AllFormValues<T>
> & {
  validateFields: () => Promise<boolean>;
} => {
  const methods = useFormContext<AllFormValues<T>>();

  const validateFields = async (): Promise<boolean> => {
    try {
      const values = methods.getValues() || {};
      const keys = Object.keys(values) as Path<AllFormValues<T>>[];
      // If no keys (edge case), validate whole form
      return keys.length ? await methods.trigger(keys) : await methods.trigger();
    } catch (error) {
      // Optionally log error or handle it
      return false;
    }
  };

  // Memoize returned object for performance
  return useMemo(
    () => ({
      ...methods,
      validateFields,
    }),
    [methods]
  );
};
