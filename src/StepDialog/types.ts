import type React from "react";
import type z from "zod";

export type Step = {
  id: string;
  title: string;
  validationSchema: z.ZodObject<any>;
  layout: React.FC;
};
