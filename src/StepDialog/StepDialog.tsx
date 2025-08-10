import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { Step } from "./types";
import { mergeSchemas } from "./utils";

type StepDialogProps = {
  steps: Step[];
};

export const StepDialog = (props: StepDialogProps) => {
  const { steps } = props;

  const [stepIndex, setStepIndex] = useState(0);

  const stepsAmount = steps.length;

  const mergedSchema = useMemo(() => mergeSchemas(steps), [steps]);

  const form = useForm({
    resolver: zodResolver(mergedSchema),
    defaultValues: {}, // we’ll fill this from schema defaults later
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
