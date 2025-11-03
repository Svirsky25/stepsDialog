import { useState } from "react";
import { ControlledField, useStepForm, Footer, Header, type StepLayoutProps } from "steps-dialog";

type FirstStepProps = {
  customMessage: string;
  showHint: boolean;
};

type Props = StepLayoutProps & FirstStepProps;

export const Layout = ({
  onNext,
  onCancel,
  onSubmit,
  onPrevious,
  formMeta,
  stepIndex,
  stepsAmount,
  customMessage,
  showHint,
}: Props) => {
  const { control, validateFields, formState, watch } =
    useStepForm();
  const [errors, setErrors] = useState<string[]>([]);

  const name = watch("name");
  const leftButtonStyles = (name && name.length < 3) ? { disabled: true } : {};

  const handleOnNext = async () => {
    const isValid = await validateFields();

    if (!isValid) {
      setErrors((prev) => [
        ...prev,
        (formState.errors.name ? formState.errors.name.message : undefined) || "unknown error in name",
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
      <p style={{ fontStyle: "italic", color: "#666" }}>{customMessage}</p>
      {showHint && (
        <div style={{ background: "#f0f8ff", padding: "10px", borderRadius: "4px", marginBottom: "10px" }}>
          💡 Hint: Make sure your name is at least 4 characters long!
        </div>
      )}
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
