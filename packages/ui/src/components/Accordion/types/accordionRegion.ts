import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from "react";

export type AccordionRegionControlledOptionalProps = Partial<{}>;

export type AccordionRegionControlledRequiredProps = {
  id: string;
};

export type AccordionRegionProps = PropsWithChildren &
  Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    keyof AccordionRegionControlledRequiredProps
  > &
  AccordionRegionControlledOptionalProps &
  AccordionRegionControlledRequiredProps;
