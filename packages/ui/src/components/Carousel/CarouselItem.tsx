import { useMemo } from "react";
import { CarouselItemProps } from "./types/carouselItem.type";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { carouselItemCls } from "@hw-rui/core/consts";
import { useCarouselContext } from ".";

const getIsVisible = (currentIndex: number | number[], index: number) => {
  if (typeof currentIndex === "number") {
    return currentIndex === index;
  } else {
    return currentIndex.includes(index);
  }
};

const CarouselItem: CarouselItemProps = (props) => {
  const { children, className: classNameProp, index } = props;
  const { currentIndex } = useCarouselContext();
  const cls = useMemo(
    () => getMergedInjectedClassName(carouselItemCls, classNameProp),
    [classNameProp]
  );

  const isVisible = useMemo(
    () => getIsVisible(currentIndex, index ?? 0),
    [currentIndex, index]
  );

  return isVisible ? <div className={cls}>{children}</div> : null;
};
export default CarouselItem;
