import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import useCalendarDates from "./hooks/useCalendarDates";
import { CalendarBodyProps } from "./types/calendarBody";
import { calendarBodyCls } from "@hw-rui/core/consts";
import { useMemo } from "react";
import { useCalendarContext } from ".";
import { CalendarDate } from "./types";
import CalendarDateCell from "./internals/CalendarDateCell";

const CalendarBody: CalendarBodyProps = (props) => {
  const { mode } = useCalendarContext();
  const dates = useCalendarDates();
  const { children, className: classNameProp } = props;
  const cls = useMemo(
    () => getMergedInjectedClassName(calendarBodyCls, classNameProp),
    [classNameProp]
  );
  if (children && typeof children === "function") {
    return children(dates);
  }

  const renderDateCell = () => {
    if (mode === "month") {
      return (dates as CalendarDate[][]).map((week, weekIndex) => (
        <div key={`week-key-${weekIndex}`} className={`${cls}-week`}>
          {week.map((date, dateIndex) => (
            <CalendarDateCell
              key={`date-key-${dateIndex}`}
              date={date}
              className={cls}
            />
          ))}
        </div>
      ));
    }
    if (mode === "week") {
      return (
        <div className={`${cls}-week`}>
          {(dates as CalendarDate[]).map((date, dateIndex) => (
            <CalendarDateCell
              key={`date-key-${dateIndex}`}
              date={date}
              className={cls}
            />
          ))}
        </div>
      );
    }
  };

  return <div className={cls}>{renderDateCell()}</div>;
};
export default CalendarBody;
