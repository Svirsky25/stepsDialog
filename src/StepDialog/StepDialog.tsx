import { useMemo, useState } from "react";
import type { Step } from "./types";

type StepDialogProps = {
  steps: Step[];
};

export const StepDialog = (props: StepDialogProps) => {
  const { steps } = props;

  const [stepIndex, setStepIndex] = useState(0);

  const stepsAmount = steps.length;

  const onNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, stepsAmount - 1));
  };

  const onPrevious = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentStep = steps[stepIndex];
  const CurrentStepLayout = useMemo(() => currentStep.layout, [currentStep]);

  return (
    <>
      <CurrentStepLayout
        stepIndex={stepIndex}
        stepsAmount={stepsAmount}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </>
  );
};
