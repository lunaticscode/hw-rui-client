import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { useCalendarContext } from "..";
import { CalendarDateCellProps } from "../types/calendarDateCell";
import { getFormatedDateCellByMode } from "../utils/dateFormat";
import { calendarDateCellCls } from "@hw-rui/core/consts";
import { useMemo } from "react";
import { isEqualByMode } from "../utils/isEqual";

const CalendarDateCell: CalendarDateCellProps = (props) => {
  const { mode, handleChangeSelectedValue, selectedValue } =
    useCalendarContext();
  const { date, className } = props;

  const cls = useMemo(
    () => getMergedInjectedClassName(calendarDateCellCls, className),
    [className]
  );

  const handleClickDateCell = () => {
    handleChangeSelectedValue(date);
  };

  const isActive = useMemo(
    () => isEqualByMode(date, selectedValue, mode),
    [date, selectedValue, mode]
  );

  return (
    <div data-active={isActive} onClick={handleClickDateCell} className={cls}>
      {getFormatedDateCellByMode(date, mode)}
    </div>
  );
};
export default CalendarDateCell;
