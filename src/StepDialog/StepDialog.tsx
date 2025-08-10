import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { Step } from "./types";
import { extractStepsDefaultValues, mergeStepsShapes } from "./utils";

type StepDialogProps = {
  steps: Step[];
};

export const StepDialog = (props: StepDialogProps) => {
  const { steps } = props;

  const [stepIndex, setStepIndex] = useState(0);

  const stepsAmount = steps.length;

  const mergedShemas = mergeStepsShapes(steps);
  const defaultValues = extractStepsDefaultValues(steps);

  console.log({ mergedShemas });
  console.log({ defaultValues });

  const form = useForm({
    resolver: zodResolver(mergedShemas),
    defaultValues: defaultValues,
    mode: "onBlur",
  });

  const onNext = () => {
    setStepIndex((prev) => Math.min(prev + 1, stepsAmount - 1));
  };

  const onPrevious = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const currentStep = steps[stepIndex];
  const CurrentStepLayout = useMemo(() => currentStep.layout, [currentStep]);

  return (
    <FormProvider {...form}>
      <CurrentStepLayout
        stepIndex={stepIndex}
        stepsAmount={stepsAmount}
        onNext={onNext}
        onPrevious={onPrevious}
      />
    </FormProvider>
  );
};
