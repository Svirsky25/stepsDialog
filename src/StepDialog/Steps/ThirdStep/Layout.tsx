import type { steps } from "..";
import { useStepForm } from "../../hooks/useStepForm";
import type { StepLayoutProps } from "../../types";

export const Layout = ({ onNext, onPrevious }: StepLayoutProps) => {
  const { getValues } = useStepForm<typeof steps>();

  const { age, name } = getValues();

  return (
    <div>
      <h1>Summary</h1>
      <h2>
        {name} is {age} years old.
      </h2>
      <h3>Welcome to the club.</h3>

      <button type="button" onClick={onPrevious}>
        Back
      </button>
      <button type="button" onClick={onNext}>
        Next
      </button>
    </div>
  );
};
