import type { secondStep } from ".";
import { useStepForm } from "../../hooks/useStepForm";
import { Footer } from "../../toolbox";
import { Header } from "../../toolbox/Header";
import { Title } from "../../toolbox/Title";
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
  const { register, getValues } = useStepForm<typeof secondStep>();

  const { age } = getValues();

  return (
    <div>
      <Title title={formMeta.dialogTitle} />
      <Header stepIndex={stepIndex} formMeta={formMeta} />
      <h2>
        Step {stepIndex + 1} of {stepsAmount}
      </h2>
      <h4>This is the age! {age}</h4>
      <input
        type="number"
        {...register("age", { valueAsNumber: true })}
        placeholder="Enter your age"
      />
      <Footer
        onNext={onNext}
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
