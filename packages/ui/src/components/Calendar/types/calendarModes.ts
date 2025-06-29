import { FC, ReactNode } from "react";
import { CalendarMode } from ".";

type CalendarModesOptionalProps = Partial<{
  children: (
    modes: CalendarMode[],
    handleClickMode: (mode: CalendarMode) => void
  ) => ReactNode;
  className: string;
}>;
export type CalendarModesProps = FC<CalendarModesOptionalProps>;
