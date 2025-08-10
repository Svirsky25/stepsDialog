import type React from "react";
import type { ZodObject, ZodRawShape } from "zod";

export type StepLayoutProps = {
  onNext: () => void;
  onPrevious: () => void;
  stepIndex: number;
  stepsAmount: number;
};

export type Step = {
  id: string;
  title: string;
  validationSchema: ZodObject<ZodRawShape>;
  layout: React.FC<StepLayoutProps>;
};
