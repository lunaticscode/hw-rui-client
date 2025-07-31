import { FC, PropsWithChildren } from "react";

type CarouselRequiredProps = {};
type CarouselOptionalProps = Partial<{
  className: string;
  itemsPerView: number;
  transitionMode: "swipe";
  defaultIndex: number | number[];
  onChangeItem: (index: number | number[]) => void;
}>;

export type CarouselContextProps = Pick<
  CarouselOptionalProps,
  "itemsPerView" | "transitionMode"
> & {
  currentIndex: number | number[];
  handleChangeCarouselItemsCount: (count: number) => void;
  handleClickNavigator: (direction: -1 | 1) => void;
};

export type CarouselProps = FC<
  CarouselOptionalProps & CarouselRequiredProps & PropsWithChildren
>;
