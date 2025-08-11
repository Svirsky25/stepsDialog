import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@mui/material/Dialog";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DialogRoot } from "./DialogRoot";
import type { Step } from "./types";
import { extractStepsDefaultValues, mergeStepsShapes } from "./utils";
import type { z } from "zod";

type StepDialogProps = {
  title: string;
  steps: readonly Step[];
};

export const StepDialog = (props: StepDialogProps) => {
  const { title, steps } = props;

  const [open, setOpen] = useState(false);

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
    shouldUnregister: true, // recommended for step UIs
  });

  const onOpen = () => {
    setOpen(true);
  };

  const { reset } = form;

  const onClose = () => {
    reset();
    setOpen(false);
  };

  return (
    <FormProvider {...form}>
      <button onClick={onOpen}>Open Dialog</button>
      <Dialog open={open}>
        <DialogRoot title={title} steps={steps} onClose={onClose} />
      </Dialog>
    </FormProvider>
  );
};
