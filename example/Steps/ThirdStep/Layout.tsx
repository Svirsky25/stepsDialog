import { dialogTitle, type steps } from "..";
import { useStepForm, Header, Title, Footer } from "steps-dialog";
import type { StepLayoutProps } from "steps-dialog";

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
      <Footer
        onNext={onNext}
        onCancel={onCancel}
        onPrevious={onPrevious}
        onSubmit={onSubmit}
        stepIndex={stepIndex}
        stepsAmount={stepsAmount}
      />
    </div>
  );
};
