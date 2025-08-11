import { useMemo, useState } from "react";
import type { Step } from "./types";
import { useStepForm } from "./hooks/useStepForm";

type StepDialogProps = {
  steps: ReadonlyArray<Step>;
  onClose: VoidFunction;
};

export const DialogRoot = (props: StepDialogProps) => {
  const { steps, onClose } = props;

  const stepsAmount = steps.length;
  const [stepIndex, setStepIndex] = useState(0);

  const onNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, stepsAmount - 1));
  };

  const onPrevious = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const { reset } = useStepForm<typeof steps>();
  const onCancel = () => {
    reset();
    onClose();
  };

  const onSubmit = () => {
    onClose();
  };

  const currentStep = steps[stepIndex];
  const CurrentStepLayout = useMemo(() => currentStep.layout, [currentStep]);

  return (
    <CurrentStepLayout
      stepIndex={stepIndex}
      stepsAmount={stepsAmount}
      onNext={onNext}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onPrevious={onPrevious}
    />
  );
};
