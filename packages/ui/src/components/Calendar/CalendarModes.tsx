import { useMemo } from "react";
import { useCalendarContext } from ".";
import { CALENDAR_MODES } from "./consts";
import { CalendarMode } from "./types";
import { CalendarModesProps } from "./types/calendarModes";
import { calendarModesCls } from "@repo/core/consts";
import { getMergedInjectedClassName } from "@repo/core/utils";

const CalendarModes: CalendarModesProps = (props) => {
  const { children, className: classNameProp } = props;
  const { handleChangeMode } = useCalendarContext();

  const cls = useMemo(
    () => getMergedInjectedClassName(calendarModesCls, classNameProp),
    [classNameProp]
  );

  const handleClickMode = (mode: CalendarMode) => {
    handleChangeMode(mode);
  };

  if (children && typeof children === "function") {
    return children(
      CALENDAR_MODES as unknown as CalendarMode[],
      handleClickMode
    );
  }

  return (
    <div className={cls}>
      {CALENDAR_MODES.map((calendarMode, index) => (
        <button
          className={`${cls}-mode-${calendarMode}`}
          onClick={() => handleClickMode(calendarMode)}
          key={`calendar-mode-button-key-${index}`}
        >
          {calendarMode}
        </button>
      ))}
    </div>
  );
};
export default CalendarModes;
