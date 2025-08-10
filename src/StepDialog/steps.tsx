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
    layout: () => (
      <Typography variant="h1" component="h2">
        This is the First Step!
      </Typography>
    ),
  },
  {
    id: "second",
    title: "second step",
    validationSchema: z.object({
      name: z.string().min(0, "name is required"),
    }),
    layout: () => (
      <Typography variant="h1" component="h2">
        This is the Second Step!
      </Typography>
    ),
  },
] satisfies Step[];
