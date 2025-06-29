import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { useCalendarContext } from ".";
import { CalendarTodayProps } from "./types/calendarToday";
import { useMemo } from "react";
import { calendarTodayButtonCls } from "@hw-rui/core/consts";

const CALENDAR_TODAY_DEFAULT_LABEL = "Today";
const CalendarToday: CalendarTodayProps = (props) => {
  const { handleChangeSelectedValue } = useCalendarContext();
  const { children, className: classNameProp } = props;

  const cls = useMemo(
    () => getMergedInjectedClassName(calendarTodayButtonCls, classNameProp),
    [classNameProp]
  );

  const handleClickToday = () => {
    handleChangeSelectedValue(new Date());
  };

  if (children && typeof children === "function") {
    return children(handleClickToday);
  }

  return (
    <button className={cls} onClick={handleClickToday}>
      {CALENDAR_TODAY_DEFAULT_LABEL}
    </button>
  );
};
export default CalendarToday;
