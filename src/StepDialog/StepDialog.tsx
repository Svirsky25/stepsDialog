import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@mui/material/Dialog";
import type React from "react";
import { useMemo } from "react";
import { FormProvider, useForm, type Mode } from "react-hook-form";
import type { z } from "zod";
import { DialogRoot } from "./DialogRoot";
import { extractStepsDefaultValues, extractStepsFromChildren, mergeStepsShapes } from "./utils";

type StepDialogProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
  mode?: Mode;
};

export const StepDialog = (props: StepDialogProps) => {
  const { children, open, onClose, mode } = props;

  const steps = useMemo(() => extractStepsFromChildren(children), [children]);
  const mergedShemas = useMemo(() => mergeStepsShapes(steps), [steps]);
  const defaultValues = useMemo(
    () => extractStepsDefaultValues(steps),
    [steps]
  );

  type FormValues = z.infer<typeof mergedShemas>;

  const form = useForm<FormValues>({
    resolver: zodResolver(mergedShemas),
    defaultValues,
    mode: mode || "onSubmit",
  });

  const { reset } = form;
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <FormProvider {...form}>
      <Dialog open={open}>
        <DialogRoot steps={steps} onClose={handleClose} />
      </Dialog>
    </FormProvider>
  );
};
