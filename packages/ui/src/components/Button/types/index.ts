import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  ReactNode,
} from "react";

/** @default "default" */
export type ButtonVariants = "default" | "positive" | "negative" | "ghost";
/** @default "md" */
export type ButtonSizes = "sm" | "md" | "lg" | "full";
/** @default getDefaultProps() */
export type ButtonControlledOptionalProps = Partial<{
  variant: ButtonVariants;
  size: ButtonSizes;
  icon: ReactNode;
}>;

export type ButtonProps = PropsWithChildren &
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
  ButtonControlledOptionalProps;
