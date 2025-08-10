import type React from "react";
import type { z, ZodObject, ZodRawShape } from "zod";

export type StepLayoutProps = {
  onNext: () => void;
  onPrevious: () => void;
  stepIndex: number;
  stepsAmount: number;
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

export type StepFields<S extends Step> = keyof z.infer<S["validationSchema"]>;

export type StepId<T extends readonly Step[]> = T[number]["id"];
