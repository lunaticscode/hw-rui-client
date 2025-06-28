import { FC, PropsWithChildren } from "react";

export type CalendarDate = Date;
export type CalendarMode = "month" | "week";
type CalendarOptionalProps = Partial<{
  className?: string;
  value: CalendarDate;
  onChange: (date: CalendarDate) => void;
  defaultValue: CalendarDate;
}>;
type CalendarRequiredProps = {};

export type CalendarContextProps = {
  mode: CalendarMode;
  handleChangeMode: (mode: CalendarMode) => void;
  selectedValue: CalendarDate;
  handleChangeSelectedValue: (date: CalendarDate) => void;
};

export type CalendarProps = FC<
  PropsWithChildren & CalendarOptionalProps & CalendarRequiredProps
>;
