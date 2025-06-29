import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { useCalendarContext } from ".";
import { CalendarCurrentProps } from "./types/calendarCurrent";
import { getFormatedCurrentByMode } from "./utils/dateFormat";
import { calendarCurrentCls } from "@hw-rui/core/consts";
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
  return (
    <div className={cls}>{getFormatedCurrentByMode(selectedValue, mode)}</div>
  );
};
export default CalendarCurrent;
