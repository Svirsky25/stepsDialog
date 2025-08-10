// useStepForm.ts
import { useFormContext, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { Step } from "../types";

/** (A | B) -> (A & B) */
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type ValuesOfSingleStep<S extends Step> = z.infer<S["validationSchema"]>;

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
> {
  return useFormContext<AllFormValues<T>>();
}
