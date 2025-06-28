import { getMergedInjectedClassName } from "@repo/core/utils";
import { useCalendarContext } from ".";
import { CalendarCurrentProps } from "./types/calendarCurrent";
import { getFormatedByMode } from "./utils/dateFormat";
import { calendarCurrentCls } from "@repo/core/consts";
import { useMemo } from "react";

const CalendarCurrent: CalendarCurrentProps = (props) => {
  const { selectedValue, mode } = useCalendarContext();
  const { children, className: classNameProp } = props;

  const cls = useMemo(
    () => getMergedInjectedClassName(calendarCurrentCls, classNameProp),
    [classNameProp]
  );

  if (children && typeof children === "function") {
    return <div className={cls}>{children(selectedValue)}</div>;
  }
  return <div className={cls}>{getFormatedByMode(selectedValue, mode)}</div>;
};
export default CalendarCurrent;
