import { CalendarDate, CalendarMode } from "../types";
import { CalendarNavigatorDirections } from "../types/calendarNavigator";

const getDateFromNavigator = (
  date: CalendarDate,
  direction: CalendarNavigatorDirections,
  mode: CalendarMode
) => {
  const [prevYear, prevMonth, prevDate] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];
  if (mode === "month") {
  }
  if (mode === "week") {
  }
};

export default getDateFromNavigator;
