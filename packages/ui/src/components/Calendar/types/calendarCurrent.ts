import { FC, ReactNode } from "react";
import { CalendarDate } from ".";

type CalendarCurrentOptionalProps = Partial<{
  className: string;
  children?: (currentDate: CalendarDate) => ReactNode;
}>;
type CalendarCurrentRequiredProps = {};
export type CalendarCurrentProps = FC<
  CalendarCurrentOptionalProps & CalendarCurrentRequiredProps
>;
