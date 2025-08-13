import type { secondStep } from ".";
import { dialogTitle } from "..";
import { ControlledField } from "../../formFields/textField";
import { useStepForm } from "../../hooks/useStepForm";
import { Title, Header, Footer } from "../../toolbox";
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
  const { control, getValues } = useStepForm<typeof secondStep>();

  const { age } = getValues();

  return (
    <div>
      <Title title={dialogTitle} />
      <Header stepIndex={stepIndex} formMeta={formMeta} />
      <h2>
        Step {stepIndex + 1} of {stepsAmount}
      </h2>
      <h4>This is the age! {age}</h4>
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
      >
        <div>Skibidi</div>
      </Footer>
    </div>
  );
};
