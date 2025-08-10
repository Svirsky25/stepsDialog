import type { ReactNode } from "react";
import type React from "react";
import type { z, ZodObject, ZodRawShape } from "zod";

export type StepLayoutProps = {
  stepIndex: number;
  stepsAmount: number;
  onNext: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onPrevious: () => void;
};

export type ToolboxComponentProps = StepLayoutProps & {
  children?: ReactNode;
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

// export type StepFields<S extends Step> = keyof z.infer<S["validationSchema"]>;

export type StepId<TSteps extends readonly Step[]> = TSteps[number]["id"];

export type StepById<
  TSteps extends readonly Step[],
  I extends StepId<TSteps>
> = Extract<TSteps[number], { id: I }>;

export type StepValues<
  TSteps extends readonly Step[],
  I extends StepId<TSteps>
> = z.infer<StepById<TSteps, I>["validationSchema"]>;

export type StepFields<
  TSteps extends readonly Step[],
  I extends StepId<TSteps>
> = keyof StepValues<TSteps, I> & string;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type AllStepValues<TSteps extends readonly Step[]> = UnionToIntersection<
  StepValues<TSteps, StepId<TSteps>>
>;
