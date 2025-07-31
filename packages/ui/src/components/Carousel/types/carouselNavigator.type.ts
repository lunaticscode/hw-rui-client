import { FC, PropsWithChildren, ReactNode } from "react";

type CarouselNavigatorRequiredProps = {};

type CarouselNavigatorOptionalProps = Partial<{
  className: string;
  children: (prev: () => void, next: () => void) => ReactNode;
}>;

export type CarouselNavigatorProps = FC<
  CarouselNavigatorOptionalProps & CarouselNavigatorRequiredProps
>;
