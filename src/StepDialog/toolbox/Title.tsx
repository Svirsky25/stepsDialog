import { DialogTitle } from "@mui/material";

export type TitleProps = {
  title: string;
};

export const Title = (props: TitleProps) => {
  const { title } = props;

  return <DialogTitle>{title}</DialogTitle>;
};
