import { useMemo } from "react";
import { useCalendarContext } from "..";
import getCalendarDates from "../utils/getCalendarDates";
import getMemorizedRule from "../utils/getMemorizedRule";

const useCalendarDates = () => {
  const { selectedValue, mode } = useCalendarContext();
  const dates = useMemo(
    () => getCalendarDates(selectedValue, mode),
    [getMemorizedRule(selectedValue, mode), mode]
  );
  return dates;
};

export default useCalendarDates;
