import type { Step } from "../types";
import { firstStep } from "./FirstStep";
import { secondStep } from "./SecondStep";
import { thirdStep } from "./ThirdStep";

export const dialogTitle = "דיאלוג הצעדים";

export const steps = [
  firstStep,
  secondStep,
  thirdStep,
] as const satisfies readonly Step[];
