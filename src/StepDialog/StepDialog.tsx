import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@mui/material/Dialog";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { z } from "zod";
import { DialogRoot } from "./DialogRoot";
import type { Step } from "./types";
import { extractStepsDefaultValues, mergeStepsShapes } from "./utils";

type StepDialogProps = {
  title: string;
  steps: readonly Step[];
  open: boolean;
  onClose: () => void;
};

export const StepDialog = (props: StepDialogProps) => {
  const { title, steps, open, onClose } = props;

  const mergedShemas = useMemo(() => mergeStepsShapes(steps), [steps]);
  const defaultValues = useMemo(
    () => extractStepsDefaultValues(steps),
    [steps]
  );

  type FormValues = z.infer<typeof mergedShemas>;

  const form = useForm<FormValues>({
    resolver: zodResolver(mergedShemas),
    defaultValues,
    mode: "onChange",
  });

  const { reset } = form;

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <FormProvider {...form}>
      <Dialog open={open}>
        <DialogRoot title={title} steps={steps} onClose={handleClose} />
      </Dialog>
    </FormProvider>
  );
};
