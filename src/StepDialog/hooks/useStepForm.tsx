// useStepForm.ts
import { useFormContext, type Path, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { Step } from "../types";

/** (A | B) -> (A & B) */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type ValuesOfSingleStep<TStep extends Step> = z.infer<
  TStep["validationSchema"]
>;

type ValuesOfStepsArray<TSteps extends readonly Step[]> = z.infer<
  TSteps[number]["validationSchema"]
>;

export type AllFormValues<T extends Step | readonly Step[]> = T extends Step
  ? ValuesOfSingleStep<T>
  : T extends readonly Step[]
  ? UnionToIntersection<ValuesOfStepsArray<T>>
  : never;

export function useStepForm<T extends Step | readonly Step[]>(): UseFormReturn<
  AllFormValues<T>
> & {
  validateFields: () => Promise<boolean>;
} {
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
}
