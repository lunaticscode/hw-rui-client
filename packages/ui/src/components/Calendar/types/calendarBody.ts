import { FC, ReactNode } from "react";
import { CalendarDate } from ".";

type CalendarBodyRequiredProps = {};
type CalendarBodyOptionalProps = Partial<{
  className: string;
  children: (dates: CalendarDate[] | CalendarDate[][]) => ReactNode;
}>;
export type CalendarBodyProps = FC<
  CalendarBodyOptionalProps & CalendarBodyRequiredProps
>;
