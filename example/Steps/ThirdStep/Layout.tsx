import { dialogTitle } from "..";
import { useStepForm, Header, Title, Footer, type StepLayoutProps } from "steps-dialog";

type ThirdStepProps = {
  showSummary: boolean;
  theme: "dark" | "light";
};

type Props = StepLayoutProps & ThirdStepProps;

export const Layout = ({
  onCancel,
  onSubmit,
  onNext,
  onPrevious,
  formMeta,
  stepIndex,
  stepsAmount,
  showSummary,
  theme,
}: Props) => {
  const { getValues } = useStepForm();

  const { age, name } = getValues();

  const themeStyles = {
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#333",
    padding: "20px",
    borderRadius: "8px",
  };

  return (
    <div style={themeStyles}>
      <Title title={dialogTitle} />
      <Header stepIndex={stepIndex} formMeta={formMeta} />
      <h1>Summary ({theme} theme)</h1>
      {showSummary && (
        <div style={{
          background: theme === "dark" ? "#555" : "#f5f5f5",
          padding: "15px",
          borderRadius: "4px",
          margin: "10px 0"
        }}>
          <h2>Your Information:</h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Age:</strong> {age} years old</p>
        </div>
      )}
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
