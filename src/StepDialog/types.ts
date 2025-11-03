import type React from "react";
import type { z, ZodObject, ZodRawShape } from "zod";

export type FormMeta = {
  stepsTitles: { id: string; title: string }[];
};

export type StepLayoutProps = {
  formMeta: FormMeta;
  stepIndex: number;
  stepsAmount: number;
  onNext: VoidFunction;
  onCancel: VoidFunction;
  onSubmit: VoidFunction;
  onPrevious: VoidFunction;
};

export type Step<
  Id extends string = string,
  Shape extends ZodRawShape = ZodRawShape
> = {
  id: Id;
  title: string;
  validationSchema: ZodObject<Shape>;
  layout: React.FC<StepLayoutProps>;
};

export type StepChild = React.ReactElement<{
  id: string;
  title: string;
  validationSchema: ZodObject<ZodRawShape>;
  children: React.ReactNode;
}>;

/** (A | B) -> (A & B) */
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
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

// Additional exports needed by index.ts
export type StepDialogProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
  mode?: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all";
};

export type StepMeta = {
  id: string;
  title: string;
};
