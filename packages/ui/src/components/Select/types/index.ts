import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

export type SelectValue = string;

export type SelectContextProps = {
  selectedValue: SelectValue;
  handleChangeSelectedValue: (value: SelectValue, label: ReactNode) => void;
};

export type SelectControlledOptionalProps = Partial<{
  value: SelectValue;
  onChange: (selectedValue: SelectValue) => void;
  defaultValue: SelectValue;
}>;

export type SelectControlledRequiredProps = {};

export type SelectProps = PropsWithChildren &
  Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    keyof SelectControlledOptionalProps
  > &
  SelectControlledOptionalProps &
  SelectControlledRequiredProps;
