import { useFormContext, type RegisterOptions } from "react-hook-form";
import type z from "zod";
import type { Step } from "../types";

/** Minimal wrapper around RHF's FormContext. */
export const useStepForm = <S extends Step>() => {
  const methods = useFormContext();

  type Fields = keyof z.infer<S["validationSchema"]> & string;

  const register = <K extends Fields>(name: K, options?: RegisterOptions) =>
    methods.register(name as string, options);

  const getValues = <K extends Fields | Fields[] | undefined>(name?: K) =>
    methods.getValues(name as any);

  const watch = <K extends Fields | Fields[] | undefined>(name?: K) =>
    methods.watch(name as any);

  return {
    ...methods,
    register,
    getValues,
    watch,
  };
};
