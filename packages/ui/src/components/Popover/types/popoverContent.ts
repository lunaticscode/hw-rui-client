import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from "react";

export type PopoverContentPortalProps = PropsWithChildren & {
  className?: string;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type PopoverContentControlledOptionalProps = Partial<{}>;

export type PopoverContentControlledRequiredProps = {};

export type PopoverContentProps = PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  PopoverContentControlledOptionalProps &
  PopoverContentControlledRequiredProps;
