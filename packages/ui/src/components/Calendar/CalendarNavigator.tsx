import { getMergedInjectedClassName } from "@repo/core/utils";
import { useCalendarContext } from ".";
import { CalendarNavigatorProps } from "./types/calendarNavigator";
import { useMemo } from "react";
import { calendarNavigatorCls } from "@repo/core/consts";
import getDateFromNavigator from "./utils/getDateFromNavigator";

const CalendarNavigator: CalendarNavigatorProps = (props) => {
  const { mode, selectedValue, handleChangeSelectedValue } =
    useCalendarContext();
  const { className: classNameProp, children } = props;
  const cls = useMemo(
    () => getMergedInjectedClassName(calendarNavigatorCls, classNameProp),
    [classNameProp]
  );

  const handleNavigatePrev = () => {
    const changedDate = getDateFromNavigator(selectedValue, -1, mode);
    handleChangeSelectedValue(changedDate);
  };
  const handleNavigateNext = () => {
    const changedDate = getDateFromNavigator(selectedValue, +1, mode);
    handleChangeSelectedValue(changedDate);
  };

  if (children && typeof children === "function") {
    return children(handleNavigatePrev, handleNavigatePrev);
  }

  return (
    <div className={cls}>
      <button className={`${cls}-prev`} onClick={handleNavigatePrev}>
        prev
      </button>
      <button className={`${cls}-next`} onClick={handleNavigateNext}>
        next
      </button>
    </div>
  );
};
export default CalendarNavigator;
