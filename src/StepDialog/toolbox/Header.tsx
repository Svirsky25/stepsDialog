import {
  Box,
  DialogContent,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import type { ReactNode } from "react";
import type { FormMeta, StepLayoutProps } from "../types";

export type HeaderProps = Pick<StepLayoutProps, "stepIndex" | "formMeta"> & {
  children?: ReactNode;
};

const stepTitlesMap = (formMeta: FormMeta) =>
  formMeta.stepsTitles.map((step) => step.title);

export const Header = (props: HeaderProps) => {
  const { formMeta, stepIndex, children } = props;

  const stepTitles = stepTitlesMap(formMeta);

  const styles: SxProps<Theme> = {
    fontWeight: 600,
    textDecoration: "underline",
    textUnderlinePosition: "under",
  };

  return (
    <DialogContent>
      <Box display="flex" gap={2}>
        {stepTitles.map((title, i) => {
          const isCurrent = i === stepIndex;
          return (
            <Typography
              key={`${formMeta.stepsTitles[i]?.id ?? i}`} // add key
              sx={isCurrent ? styles : undefined}
              aria-current={isCurrent ? "step" : undefined}
            >
              {title}
            </Typography>
          );
        })}
      </Box>
      {children}
    </DialogContent>
  );
};
