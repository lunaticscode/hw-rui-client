import { CalendarDate, CalendarMode } from "../types";
import { CalendarNavigatorDirections } from "../types/calendarNavigator";

const getDateFromNavigator = (
  currentDate: CalendarDate,
  direction: CalendarNavigatorDirections,
  mode: CalendarMode
) => {
  const [prevYear, prevMonth, prevDate] = [
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  ];
  if (mode === "month") {
    return new Date(prevYear, prevMonth + direction, prevDate);
  }
  if (mode === "week") {
    return new Date(prevYear, prevMonth, prevDate + 7 * direction);
  }
  return currentDate;
};

export default getDateFromNavigator;
