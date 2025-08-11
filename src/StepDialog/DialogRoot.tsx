import { useMemo, useState } from "react";
import { useStepForm } from "./hooks/useStepForm";
import type { FormMeta, Step } from "./types";

type StepDialogProps = {
  title: string;
  steps: ReadonlyArray<Step>;
  onClose: VoidFunction;
};

export const DialogRoot = (props: StepDialogProps) => {
  const { title, steps, onClose } = props;

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
    reset();
    onClose();
  };

  const currentStep = steps[stepIndex];
  const CurrentStepLayout = useMemo(() => currentStep.layout, [currentStep]);
  const formMeta: FormMeta = {
    dialogTitle: title,
    stepsTitles: steps.map((step) => ({ id: step.id, title: step.title })),
  };

  return (
    <CurrentStepLayout
      formMeta={formMeta}
      stepIndex={stepIndex}
      stepsAmount={stepsAmount}
      onNext={onNext}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onPrevious={onPrevious}
    />
  );
};
