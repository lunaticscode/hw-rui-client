import { FC, PropsWithChildren } from "react";

type CarouselHolderRequiredProps = {};
type CarouselHolderOptionalProps = Partial<{
  className: string;
}>;

export type CarouselHolderProps = FC<
  CarouselHolderOptionalProps & CarouselHolderRequiredProps & PropsWithChildren
>;
