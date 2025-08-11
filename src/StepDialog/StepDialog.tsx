import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DialogRoot } from "./DialogRoot";
import type { Step } from "./types";
import { extractStepsDefaultValues, mergeStepsShapes } from "./utils";

type StepDialogProps = {
  steps: readonly Step[];
};

export const StepDialog = (props: StepDialogProps) => {
  const { steps } = props;

  const [open, setOpen] = useState(false);

  const mergedShemas = mergeStepsShapes(steps);
  const defaultValues = extractStepsDefaultValues(steps);

  const form = useForm({
    resolver: zodResolver(mergedShemas),
    defaultValues: defaultValues,
    mode: "onChange",
  });

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <FormProvider {...form}>
      <button onClick={onOpen}>Open Dialog</button>
      <Dialog open={open}>
        <DialogRoot steps={steps} onClose={onClose} />
      </Dialog>
    </FormProvider>
  );
};
