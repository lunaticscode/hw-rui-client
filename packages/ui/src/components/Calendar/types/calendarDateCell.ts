import { FC } from "react";
import { CalendarDate } from ".";

type CalendarDateCellRequiredProps = { date: CalendarDate; className: string };
export type CalendarDateCellProps = FC<CalendarDateCellRequiredProps>;
