import { FC, PropsWithChildren } from "react";

type CarouselItemRequiredProps = {
  value: string;
};
type CarouselItemOptionalProps = Partial<{
  className: string;
  index: number;
}>;

export type CarouselItemProps = FC<
  CarouselItemOptionalProps & CarouselItemRequiredProps & PropsWithChildren
>;
