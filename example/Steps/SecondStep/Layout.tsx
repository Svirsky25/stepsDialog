import type { secondStep } from ".";
import { dialogTitle } from "..";
import { ControlledField, useStepForm, Title, Header, Footer } from "steps-dialog";
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
  const { control, getValues } = useStepForm<typeof secondStep>();

  const { age } = getValues();

  return (
    <div>
      <Title title={dialogTitle} />
      <Header stepIndex={stepIndex} formMeta={formMeta} />
      <h2>
        Step {stepIndex + 1} of {stepsAmount}
      </h2>
      <ControlledField
        control={control}
        name="age"
        label="Age"
        type="number"
        fullWidth
      />
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
