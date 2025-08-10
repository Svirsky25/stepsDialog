import { Button, DialogActions } from "@mui/material";
import type { StepLayoutProps } from "../types";
import type { CSSProperties, ReactNode } from "react";

export type FooterProps = StepLayoutProps & {
  children?: ReactNode;
  leftButtonStyles?: { css?: CSSProperties; disabled?: boolean };
  rightButtonStyles?: { css?: CSSProperties; disabled?: boolean };
};

export const Footer = (props: FooterProps) => {
  const {
    children,
    onCancel,
    onNext,
    onPrevious,
    onSubmit,
    stepIndex,
    stepsAmount,
    rightButtonStyles,
    leftButtonStyles,
  } = props;

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepsAmount - 1;

  const RightButton = () => (
    <Button
      style={rightButtonStyles?.css}
      disabled={rightButtonStyles?.disabled}
      onClick={isFirstStep ? onCancel : onPrevious}
    >
      {isFirstStep ? "ביטול" : "חזרה"}
    </Button>
  );
  const LeftButton = () => (
    <Button
      style={leftButtonStyles?.css}
      disabled={leftButtonStyles?.disabled}
      onClick={isLastStep ? onSubmit : onNext}
    >
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
