import {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

export type ToastPositions =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";
export type ToastTypes = "default" | "success" | "danger";
export type ToastStyleFromPosition = Partial<CSSProperties>;

export type ToastArgs = {
  type?: ToastTypes;
  title?: ReactNode;
  position?: ToastPositions;
  description?: ReactNode;
  closeElem?: ReactNode;
  duration?: number;
  classNames?: Partial<{
    title: string;
    description: string;
    close: string;
  }>;
};

export type ToastChildBaseProps = PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export type ToastTitleProps = ToastChildBaseProps;
export type ToastDescriptionProps = ToastChildBaseProps;
export type ToastCloseProps = ToastChildBaseProps;
export type ToastActionProps = ToastChildBaseProps;
