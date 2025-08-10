import { useState } from "react";
import type { firstStep } from ".";
import { useStepForm } from "../../hooks/useStepForm";
import { Footer } from "../../toolbox";
import type { StepLayoutProps } from "../../types";

export const Layout = ({
  onNext,
  onCancel,
  onSubmit,
  onPrevious,
  stepIndex,
  stepsAmount,
}: StepLayoutProps) => {
  const { register, validateFields, formState, watch } =
    useStepForm<typeof firstStep>();
  const [errors, setErrors] = useState<string[]>([]);

  const name = watch("name");

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
      <h2>
        Step {stepIndex + 1} of {stepsAmount}
      </h2>
      <h4>This is the name! {name}</h4>
      {!!errors.length && <h1 style={{ color: "red" }}>{errors[0]}</h1>}
      <input {...register("name")} placeholder="Enter your name" />

      <Footer
        onNext={handleOnNext}
        onCancel={onCancel}
        onPrevious={onPrevious}
        onSubmit={onSubmit}
        stepIndex={stepIndex}
        stepsAmount={stepsAmount}
      >
        <div>Skibidi</div>
      </Footer>
    </div>
  );
};
