import { DetailedHTMLProps, HTMLAttributes } from "react";

export type SelectSelectedValueProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  placeholder?: string;
};
