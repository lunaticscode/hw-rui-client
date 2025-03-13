import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

export type AccordionTriggerControlledOptionalProps = Partial<{
  disabled: boolean;
}>;

export type AccordionTriggerControlledRequiredProps = {
  id: string;
};

export type AccordionTriggerProps = PropsWithChildren &
  Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    keyof AccordionTriggerControlledRequiredProps
  > &
  AccordionTriggerControlledOptionalProps &
  AccordionTriggerControlledRequiredProps;
