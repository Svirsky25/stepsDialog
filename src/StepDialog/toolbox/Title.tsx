import { DialogTitle } from "@mui/material";

type TitleProps = {
  title: string;
};

export const Title = (props: TitleProps) => {
  const { title } = props;

  return <DialogTitle>{title}</DialogTitle>;
};
