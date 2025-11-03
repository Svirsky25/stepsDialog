import { dialogTitle } from "..";
import { ControlledField, useStepForm, Title, Header, Footer, type StepLayoutProps } from "steps-dialog";

type SecondStepProps = {
  minAge: number;
  maxAge: number;
};

type Props = StepLayoutProps & SecondStepProps;

export const Layout = ({
  onNext,
  onCancel,
  onSubmit,
  onPrevious,
  formMeta,
  stepIndex,
  stepsAmount,
  minAge,
  maxAge,
}: Props) => {
  const { control } = useStepForm();

  return (
    <div>
      <Title title={dialogTitle} />
      <Header stepIndex={stepIndex} formMeta={formMeta} />
      <h2>
        Step {stepIndex + 1} of {stepsAmount}
      </h2>
      <p style={{ color: "#555", marginBottom: "15px" }}>
        Please enter your age (between {minAge} and {maxAge} years old)
      </p>
      <ControlledField
        control={control}
        name="age"
        label="Age"
        type="number"
        fullWidth
        inputProps={{ min: minAge, max: maxAge }}
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
