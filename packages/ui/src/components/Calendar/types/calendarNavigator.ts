import { FC, ReactNode } from "react";

export type CalendarNavigatorDirections = -1 | 1;
type CalendarNavigatorRequiredProps = {};
type CalendarNavigatorOptionalProps = Partial<{
  className: string;
  children: (prev: () => void, next: () => void) => ReactNode;
}>;

export type CalendarNavigatorProps = FC<
  CalendarNavigatorOptionalProps & CalendarNavigatorRequiredProps
>;
