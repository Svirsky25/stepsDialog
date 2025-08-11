// useStepForm.ts
import { useFormContext, type Path, type UseFormReturn } from "react-hook-form";
import type { AllFormValues, Step } from "../types";

export const useStepForm = <T extends Step | readonly Step[]>(): UseFormReturn<
  AllFormValues<T>
> & {
  validateFields: () => Promise<boolean>;
} => {
  const methods = useFormContext<AllFormValues<T>>();

  const validateFields = async () => {
    // keys of whichever generic you passed: single-step or all-steps
    const keys = Object.keys(methods.getValues() || {}) as Path<
      AllFormValues<T>
    >[];
    // If no keys (edge case), validate whole form
    return keys.length ? methods.trigger(keys) : methods.trigger();
  };

  return { ...methods, validateFields };
};
