import { CalendarMode } from "../types";

const getCalendarDates = (date: Date, mode: CalendarMode) => {
  const [currentYear, currentMonth, currentDate] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];
  const mapModeToDates: {
    [key in CalendarMode]: key extends "month" | "year"
      ? () => Date[][]
      : () => Date[];
  } = {
    month: () => {
      const [firstDayOfMonth, lastDayOfMonth] = [
        new Date(currentYear, currentMonth, 1).getDay(),
        new Date(currentYear, currentMonth + 1, 0).getDay(),
      ];

      const [firstDateOfCalendar, lastDateOfCalendar] = [
        new Date(currentYear, currentMonth, 1 - firstDayOfMonth),
        new Date(currentYear, currentMonth + 1, 0 + 6 - lastDayOfMonth),
      ];

      const dateLength =
        (lastDateOfCalendar.getTime() - firstDateOfCalendar.getTime()) /
          (3600 * 1000 * 24) +
        1;

      const dates = Array.from({ length: dateLength / 7 }, (_, weekIndex) =>
        Array.from(
          { length: 7 },
          (_, dateIndex) =>
            new Date(
              firstDateOfCalendar.getTime() +
                3600 * 24 * 1000 * (weekIndex * 7 + dateIndex)
            )
        )
      );
      return dates;
    },
    week: () => {
      const currentDay = date.getDay();
      const firstDateValueOfWeek = currentDate - currentDay;
      const dates = Array.from(
        { length: 7 },
        (_, index) =>
          new Date(currentYear, currentMonth, firstDateValueOfWeek + index)
      );

      return dates;
    },
  };
  return mapModeToDates[mode]();
};

export default getCalendarDates;
