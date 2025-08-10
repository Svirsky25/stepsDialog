import { useFormContext } from "react-hook-form";
import type { StepLayoutProps } from "../../types";

export const Layout = ({
  onNext,
  onPrevious,
  stepIndex,
  stepsAmount,
}: StepLayoutProps) => {
  const { register } = useFormContext();

  return (
    <div>
      <h2>
        Step {stepIndex + 1} of {stepsAmount}
      </h2>
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
