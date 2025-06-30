import { CalendarMode } from "../types";

export const isEqualByMode = (
  srcDate: Date,
  targetDate: Date,
  mode: CalendarMode
): boolean => {
  const [year1, month1, date1] = [
    srcDate.getFullYear(),
    srcDate.getMonth(),
    srcDate.getDate(),
  ];
  const [year2, month2, date2] = [
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  ];
  const mapModeToEqaul: Record<CalendarMode, () => boolean> = {
    month: () => {
      return year1 === year2 && month1 === month2 && date1 === date2;
    },
    week: () => {
      return year1 === year2 && month1 === month2 && date1 === date2;
    },
  };
  return mapModeToEqaul[mode]();
};
