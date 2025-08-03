import { createContext, useMemo, useState } from "react";
import { useUIContext } from "@hw-rui/core/hooks";
import { carouselCls } from "@hw-rui/core/consts";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { CarouselContextProps, CarouselProps } from "./types/index.type";
import CarouselNavigator from "./CarouselNavigator";
import CarouselItem from "./CarouselItem";
import CarouselHolder from "./CarouselHolder";

type CarouselCompoundProps = {
  Navigator: typeof CarouselNavigator;
  Holder: typeof CarouselHolder;
  Item: typeof CarouselItem;
};

const CarouselContext = createContext<CarouselContextProps | null>(null);

const getChangedIndex = (
  amount: number,
  currentIndex: number | number[],
  maxIndex: number
) => {
  if (typeof currentIndex === "number") {
    const changedIndex = amount + currentIndex;
    if (changedIndex < 0 || changedIndex > maxIndex) {
      return currentIndex;
    }
    return changedIndex;
  } else {
    const changedIndexList = currentIndex.map((cur) => cur + amount);
    if (changedIndexList.some((idx) => idx < 0 || idx > maxIndex)) {
      return currentIndex;
    }
    return changedIndexList;
  }
};

const getMemorizedCurrentIndex = (currentIndex: number | number[]) => {
  if (typeof currentIndex === "number") {
    return currentIndex;
  }
  return currentIndex.join(",");
};

export const useCarouselContext = () =>
  useUIContext(CarouselContext, "CarouselContext");

const Carousel: CarouselProps & CarouselCompoundProps = (props) => {
  const {
    children,
    // transitionMode,
    itemsPerView = 1,
    className: classNameProp,
    defaultIndex = itemsPerView > 1
      ? Array.from({ length: itemsPerView }, (_, index) => index)
      : 0,
    onChangeItem,
  } = props;

  const [carouselItemsCount, setCarouselItemsCount] = useState<number>(0);

  const [currentIndex, setCurrentIndex] = useState<number | number[]>(
    defaultIndex
  );

  const handleChangeCurrentIndex = (changedIndex: number | number[]) => {
    setCurrentIndex(changedIndex);
    onChangeItem?.(changedIndex);
  };

  const handleChangeCarouselItemsCount = (count: number) => {
    setCarouselItemsCount(count);
  };

  const handleClickNavigator = (direction: -1 | 1) => {
    const changedIndex = getChangedIndex(
      direction,
      currentIndex,
      carouselItemsCount - 1
    );
    handleChangeCurrentIndex(changedIndex);
  };

  const cls = useMemo(
    () => getMergedInjectedClassName(carouselCls, classNameProp),
    [classNameProp]
  );

  const contextValue: CarouselContextProps = useMemo(
    () => ({
      currentIndex,
      handleClickNavigator,
      handleChangeCarouselItemsCount,
    }),
    [carouselItemsCount, getMemorizedCurrentIndex(currentIndex)]
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={cls}>{children}</div>
    </CarouselContext.Provider>
  );
};

Carousel.Holder = CarouselHolder;
Carousel.Item = CarouselItem;
Carousel.Navigator = CarouselNavigator;

export default Carousel;
