import type { ReactNode, Ref } from "react";

export type PopoverTriggerControlledOptionalProps = Partial<{}>;
export type PopoverTriggerControlledRequiredProps = {};

export type PopoverTriggerProps = {
  children?: // | ((triggerRef: RefObject<HTMLElement | null>) => ReactNode)
  ((triggerRef: Ref<any> | undefined) => ReactNode) | ReactNode;
  className?: string;
} & PopoverTriggerControlledOptionalProps &
  PopoverTriggerControlledRequiredProps;
