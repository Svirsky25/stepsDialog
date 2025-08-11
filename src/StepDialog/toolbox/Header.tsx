import {
  Box,
  DialogContent,
  Typography,
  type TypographyStyle,
} from "@mui/material";
import type { ReactNode } from "react";
import type { FormMeta, StepLayoutProps } from "../types";

export type HeaderProps = Pick<StepLayoutProps, "stepIndex" | "formMeta"> & {
  children?: ReactNode;
};

const stepTitlesMap = (steps: FormMeta) =>
  steps.stepsTitles.map((step) => step.title);

export const Header = (props: HeaderProps) => {
  const { formMeta, stepIndex, children } = props;

  const stepTitles = stepTitlesMap(formMeta);

  const styles: TypographyStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    textUnderlinePosition: "under",
  };

  return (
    <DialogContent>
      <Box display={"flex"} flexDirection={"row"} gap={2}>
        {stepTitles.map((title, index) => {
          const isCurrentStep = index === stepIndex;
          return (
            <Typography sx={isCurrentStep ? styles : {}}>{title}</Typography>
          );
        })}
      </Box>
      {children}
    </DialogContent>
  );
};
