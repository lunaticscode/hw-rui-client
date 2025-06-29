import { getMergedInjectedClassName } from "@repo/core/utils";
import { useCalendarContext } from "..";
import { CalendarDateCellProps } from "../types/calendarDateCell";
import { getFormatedDateCellByMode } from "../utils/dateFormat";
import { calendarDateCellCls } from "@repo/core/consts";
import { useMemo } from "react";

const CalendarDateCell: CalendarDateCellProps = (props) => {
  const { mode, handleChangeSelectedValue } = useCalendarContext();
  const { date, className } = props;
  const cls = useMemo(
    () => getMergedInjectedClassName(calendarDateCellCls, className),
    [className]
  );

  const handleClickDateCell = () => {
    handleChangeSelectedValue(date);
  };

  return (
    <div onClick={handleClickDateCell} className={cls}>
      {getFormatedDateCellByMode(date, mode)}
    </div>
  );
};
export default CalendarDateCell;
