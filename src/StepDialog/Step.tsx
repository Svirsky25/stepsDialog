import type React from "react";
import type { ZodObject, ZodRawShape } from "zod";

export type StepProps<Shape extends ZodRawShape = ZodRawShape> = {
  id: string;
  title: string;
  validationSchema: ZodObject<Shape>;
  children: React.ReactNode;
};

export const Step = <Shape extends ZodRawShape = ZodRawShape>(_props: StepProps<Shape>) => {
  // This component is only used for type checking and API structure
  // It doesn't render anything directly - the parent extracts its props
  return null;
};