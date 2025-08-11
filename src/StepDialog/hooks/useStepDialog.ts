import { useCallback, useMemo, useState } from "react";

export const useStepDialog = (initial = false) => {
  const [open, setOpen] = useState(initial);

  const openDialog = useCallback(() => setOpen(true), []);
  const closeDialog = useCallback(() => setOpen(false), []);

  const dialogProps = useMemo(
    () => ({ open, onClose: closeDialog } as const),
    [open, closeDialog]
  );

  return { open, openDialog, closeDialog, dialogProps };
};
