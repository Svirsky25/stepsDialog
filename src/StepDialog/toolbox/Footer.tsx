import { DialogActions, Button, type ButtonProps } from "@mui/material";
import type { StepLayoutProps } from "../types";
import type { ReactNode } from "react";

const defaultLabels = {
  cancel: "ביטול",
  back: "חזרה",
  next: "המשך",
  submit: "שמירה",
} as const;

export type FooterProps = Omit<StepLayoutProps, "formMeta"> & {
  children?: ReactNode;
  backButtonProps?: ButtonProps;
  nextButtonProps?: ButtonProps;
  labels?: {
    cancel?: string;
    back?: string;
    next?: string;
    submit?: string;
  };
  hideBackOnFirst?: boolean;
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
    backButtonProps,
    nextButtonProps,
    hideBackOnFirst,
  } = props;

  const isValidIndex =
    Number.isFinite(stepIndex) &&
    Number.isFinite(stepsAmount) &&
    stepsAmount! > 0;
  if (!isValidIndex) {
    // fail-safe: render nothing to avoid incorrect actions
    return null;
  }

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepsAmount - 1;

  const canGoBack = isFirstStep ? !!onCancel : !!onPrevious;
  const canGoNext = isLastStep ? !!onSubmit : !!onNext;

  const handleBack = isFirstStep ? onCancel : onPrevious;
  const handleNext = isLastStep ? onSubmit : onNext;

  const mergedLabels = { ...defaultLabels, ...props.labels };
  const backLabel = isFirstStep ? mergedLabels.cancel : mergedLabels.back;
  const nextLabel = isLastStep ? mergedLabels.submit : mergedLabels.next;

  return (
    <DialogActions sx={{ px: 2, py: 1.5 }}>
      {/* Back/Cancel */}
      {!(hideBackOnFirst && isFirstStep) && (
        <Button
          onClick={handleBack}
          disabled={!canGoBack || (backButtonProps ? backButtonProps.disabled : false)}
          {...backButtonProps}
          sx={{ mr: 1, ...(backButtonProps && backButtonProps.sx ? backButtonProps.sx : {}) }}
        >
          {backLabel}
        </Button>
      )}

      {children}

      {/* Next/Submit */}
      <Button
        onClick={handleNext}
        disabled={!canGoNext || (nextButtonProps ? nextButtonProps.disabled : false)}
        // If you later wrap with a <form>, you can do:
        // type={isLastStep ? "submit" : "button"}
        {...nextButtonProps}
        sx={{ ...(nextButtonProps && nextButtonProps.sx ? nextButtonProps.sx : {}) }}
        variant={nextButtonProps && nextButtonProps.variant !== undefined ? nextButtonProps.variant : "contained"}
      >
        {nextLabel}
      </Button>
    </DialogActions>
  );
};
