import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

export type ControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  control: Control<TFieldValues>;
  name: TName;
} & Omit<TextFieldProps, "name" | "defaultValue">;

export function ControlledField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({ control, name, ...props }: ControlledFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
