import { dialogTitle, type steps } from "..";
import { useStepForm } from "../../hooks/useStepForm";
import { Header, Title, Footer } from "../../toolbox";
import type { StepLayoutProps } from "../../types";

export const Layout = ({
  onCancel,
  onSubmit,
  onNext,
  onPrevious,
  formMeta,
  stepIndex,
  stepsAmount,
}: StepLayoutProps) => {
  const { getValues } = useStepForm<typeof steps>();

  const { age, name } = getValues();

  return (
    <div>
      <Title title={dialogTitle} />
      <Header stepIndex={stepIndex} formMeta={formMeta} />
      <h1>Summary</h1>
      <h2>
        {name} is {age} years old.
      </h2>
      <h3>Welcome to the club.</h3>
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
