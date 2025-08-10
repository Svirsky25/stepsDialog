import { Button, DialogActions } from "@mui/material";
import type { ToolboxComponentProps } from "../types";

export const Footer = (props: ToolboxComponentProps) => {
  const {
    children,
    onCancel,
    onNext,
    onPrevious,
    onSubmit,
    stepIndex,
    stepsAmount,
  } = props;

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepsAmount - 1;

  const RightButton = () => (
    <Button onClick={isFirstStep ? onCancel : onPrevious}>
      {isFirstStep ? "ביטול" : "חזרה"}
    </Button>
  );
  const LeftButton = () => (
    <Button onClick={isLastStep ? onSubmit : onNext}>
      {isLastStep ? "שמירה" : "המשך"}
    </Button>
  );

  return (
    <DialogActions>
      <RightButton />
      {children}
      <LeftButton />
    </DialogActions>
  );
};
