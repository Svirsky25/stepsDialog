import { useState } from "react";
import type { firstStep } from ".";
import { ControlledField, useStepForm, Footer, Header } from "steps-dialog";
import type { StepLayoutProps } from "steps-dialog";

export const Layout = ({
  onNext,
  onCancel,
  onSubmit,
  onPrevious,
  formMeta,
  stepIndex,
  stepsAmount,
}: StepLayoutProps) => {
  const { control, validateFields, formState, watch } =
    useStepForm<typeof firstStep>();
  const [errors, setErrors] = useState<string[]>([]);

  const name = watch("name");
  const leftButtonStyles = name?.length < 3 ? { disabled: true } : {};

  const handleOnNext = async () => {
    const isValid = await validateFields();

    if (!isValid) {
      setErrors((prev) => [
        ...prev,
        formState.errors.name?.message || "unknown error in name",
      ]);
    } else {
      setErrors([]);
      onNext();
    }
  };

  return (
    <div>
      <Header stepIndex={stepIndex} formMeta={formMeta} />
      <h2>
        Step {stepIndex + 1} of {stepsAmount}
      </h2>
      {!!errors.length && <div style={{ color: "red" }}>{errors[0]}</div>}
      <ControlledField control={control} name="name" label="Name" fullWidth />
      <Footer
        onNext={handleOnNext}
        onCancel={onCancel}
        onPrevious={onPrevious}
        onSubmit={onSubmit}
        stepIndex={stepIndex}
        stepsAmount={stepsAmount}
        nextButtonProps={leftButtonStyles}
      />
    </div>
  );
};
