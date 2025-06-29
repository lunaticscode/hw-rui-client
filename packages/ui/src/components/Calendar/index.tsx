import { createContext, useMemo, useState } from "react";
import {
  CalendarContextProps,
  CalendarProps,
  CalendarMode,
  CalendarDate,
} from "./types";
import { useControlledValue, useUIContext } from "@repo/core/hooks";
import { calendarCls } from "@repo/core/consts";
import { getMergedInjectedClassName } from "@repo/core/utils";
import CalendarCurrent from "./CalendarCurrent";
import CalendarNavigator from "./CalendarNavigator";
import CalendarToday from "./CalendarToday";
import CalendarBody from "./CalendarBody";
import CalendarModes from "./CalendarModes";

type CalendarCompoundProps = {
  Current: typeof CalendarCurrent;
  Modes: typeof CalendarModes;
  Navigator: typeof CalendarNavigator;
  Today: typeof CalendarToday;
  Body: typeof CalendarBody;
};

const CalendarContext = createContext<CalendarContextProps | null>(null);
export const useCalendarContext = () =>
  useUIContext(CalendarContext, "CalendarContext");

const Calendar: CalendarProps & CalendarCompoundProps = (props) => {
  const {
    children,
    value: valueProp,
    defaultValue: defaultValueProp = new Date(),
    defaultMode: defaultModeProp = "month",
    className: classNameProp,
    onChange,
  } = props;
  const [mode, setMode] = useState<CalendarMode>(defaultModeProp);
  const { value: selectedValue, setValue } = useControlledValue(
    valueProp,
    defaultValueProp
  );

  const handleChangeMode = (mode: CalendarMode) => {
    setMode(mode);
  };
  const handleChangeSelectedValue = (date: CalendarDate) => {
    setValue(date);
    onChange?.(date);
  };

  const contextValue: CalendarContextProps = useMemo(
    () => ({
      mode,
      handleChangeMode,
      selectedValue: selectedValue ?? new Date(),
      handleChangeSelectedValue,
    }),
    [mode, selectedValue, handleChangeMode, handleChangeSelectedValue]
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className={getMergedInjectedClassName(calendarCls, classNameProp)}>
        {children}
      </div>
    </CalendarContext.Provider>
  );
};

Calendar.Current = CalendarCurrent;
Calendar.Modes = CalendarModes;
Calendar.Navigator = CalendarNavigator;
Calendar.Today = CalendarToday;
Calendar.Body = CalendarBody;

export default Calendar;
