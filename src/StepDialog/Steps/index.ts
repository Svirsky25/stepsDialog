import type { Step } from "../types";
import { firstStep } from "./FirstStep";
import { secondStep } from "./SecondStep";

export const steps = [firstStep, secondStep] as const satisfies readonly Step[];
