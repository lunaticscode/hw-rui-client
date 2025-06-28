import { FC, ReactNode } from "react";

type CalendarTodayOptionalProps = Partial<{
  className: string;
  children?: (goToday: () => void) => ReactNode;
}>;

type CalendarTodayRequiredProps = {};
export type CalendarTodayProps = FC<
  CalendarTodayOptionalProps & CalendarTodayRequiredProps
>;
