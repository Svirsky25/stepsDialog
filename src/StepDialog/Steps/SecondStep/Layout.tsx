import type { secondStep } from ".";
import { useStepForm } from "../../hooks/useStepForm";
import type { StepLayoutProps } from "../../types";

export const Layout = ({
  onNext,
  onPrevious,
  stepIndex,
  stepsAmount,
}: StepLayoutProps) => {
  const { register, getValues } = useStepForm<typeof secondStep>();

  const { age } = getValues();

  return (
    <div>
      <h2>
        Step {stepIndex + 1} of {stepsAmount}
      </h2>
      <h4>This is the age! {age}</h4>
      <input
        type="number"
        {...register("age", { valueAsNumber: true })}
        placeholder="Enter your age"
      />

      <button type="button" onClick={onPrevious}>
        Back
      </button>
      <button type="button" onClick={onNext}>
        Next
      </button>
    </div>
  );
};
