import { CalendarMode } from "../types";

const getMemorizedRule = (date: Date, mode: CalendarMode) => {
  const mapMemorizedToMode: Record<CalendarMode, () => string> = {
    month: () => {
      return `${date.getFullYear()}${date.getMonth()}`;
    },
    week: () => {
      return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
    },
  };
  return mapMemorizedToMode[mode]();
};
export default getMemorizedRule;
