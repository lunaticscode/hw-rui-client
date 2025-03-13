import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export type SelectItemProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  SelectItemControlledOptionalProps &
  SelectItemControlledRequiredProps;

export type SelectItemControlledOptionalProps = Partial<{}>;
export type SelectItemControlledRequiredProps = {
  value: string;
  children: ReactNode;
};
