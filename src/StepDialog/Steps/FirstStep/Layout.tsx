import { useState } from "react";
import type { firstStep } from ".";
import { ControlledField } from "../../formFields/textField";
import { useStepForm } from "../../hooks/useStepForm";
import { Footer, Header } from "../../toolbox";
import type { StepLayoutProps } from "../../types";

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
      {/* <Title title={dialogTitle} /> */}
      <Header stepIndex={stepIndex} formMeta={formMeta}>
        sKIBIDI
      </Header>
      <h2>
        Step {stepIndex + 1} of {stepsAmount}
      </h2>
      <h4>This is the name! {name}</h4>
      {!!errors.length && <h1 style={{ color: "red" }}>{errors[0]}</h1>}
      <ControlledField control={control} name="name" label="Name" fullWidth />
      <Footer
        onNext={handleOnNext}
        onCancel={onCancel}
        onPrevious={onPrevious}
        onSubmit={onSubmit}
        stepIndex={stepIndex}
        stepsAmount={stepsAmount}
        labels={{ next: "יאללה" }}
        nextButtonProps={leftButtonStyles}
      ></Footer>
    </div>
  );
};
