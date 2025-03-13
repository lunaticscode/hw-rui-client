import type {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from "react";

export type AccordionControlledOptionalProps = Partial<{
  onExpandedIds: (id: string) => void;
  defaultExpandedIds: string[];
  disabled: boolean;
}>;
export type AccordionControlledRequiredProps = {};

export interface AccordionProps
  extends PropsWithChildren,
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    AccordionControlledOptionalProps,
    AccordionControlledRequiredProps {}

export type AccordionContextProps = Pick<AccordionProps, "disabled"> & {
  expandedIds: string[];
  handleChangeExpanded: (id: string, expanded: boolean) => void;
};
