import type { ReactNode, RefObject } from "react";

export type PopoverTriggerControlledOptionalProps = Partial<{}>;
export type PopoverTriggerControlledRequiredProps = {};

export type PopoverTriggerProps = {
  children?:
    | ((triggerRef: RefObject<HTMLElement | null>) => ReactNode)
    | ReactNode;
  className?: string;
} & PopoverTriggerControlledOptionalProps &
  PopoverTriggerControlledRequiredProps;
