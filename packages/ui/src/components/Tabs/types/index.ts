import { FC, PropsWithChildren } from "react";

export type TabsValue = string;

export type TabsContextProps = {
  selectedValue: TabsValue;
  handleChangeSelectedValue: (value: TabsValue) => void;
};

type TabsRequiredProps = {};
type TabsOptionalProps = Partial<
  PropsWithChildren & {
    className: string;
    value: TabsValue;
    onChange: (value: TabsValue) => void;
    defaultValue: TabsValue;
  }
>;
export type TabsProps = FC<TabsOptionalProps & TabsRequiredProps>;
