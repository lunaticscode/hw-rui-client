import { FC, PropsWithChildren } from "react";
import { CALENDAR_MODES } from "../consts";

export type CalendarDate = Date;
export type CalendarMode = (typeof CALENDAR_MODES)[number];

type CalendarOptionalProps = Partial<{
  className?: string;
  value: CalendarDate;
  onChange: (date: CalendarDate) => void;
  defaultValue: CalendarDate;
  defaultMode: CalendarMode;
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
