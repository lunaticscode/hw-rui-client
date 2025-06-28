import { CalendarDate, CalendarMode } from "../types";

export const getFormatedByMode = (date: CalendarDate, mode: CalendarMode) => {
  if (mode === "month" || mode === "week") {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = `0${month}`;
    }
    return `${year}.${month}`;
  }
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
};
