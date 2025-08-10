import z from "zod";
import type { Step } from "./types";
import { Typography } from "@mui/material";

export const steps = [
  {
    id: "first",
    title: "first step",
    validationSchema: z.object({
      name: z.string().min(0, "name is required"),
    }),
    layout: ({ onNext }) => (
      <Typography variant="h1" component="h2">
        This is the First Step!
        <button onClick={onNext}>Next</button>
      </Typography>
    ),
  },
  {
    id: "second",
    title: "second step",
    validationSchema: z.object({
      age: z.number().min(4, "Age must be at least 4").default(8),
    }),
    layout: ({ onPrevious }) => (
      <Typography variant="h1" component="h2">
        This is the Second Step!
        <button onClick={onPrevious}>Previous</button>
      </Typography>
    ),
  },
] satisfies Step[];
