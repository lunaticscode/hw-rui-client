import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useMemo,
} from "react";
import { CarouselHolderProps } from "./types/carouselHolder.type";
import CarouselItem from "./CarouselItem";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { carouselHolderCls } from "@hw-rui/core/consts";
import { CarouselItemProps } from "./types/carouselItem.type";
import { useCarouselContext } from ".";

const CarouselHolder: CarouselHolderProps = (props) => {
  const { children, className: classNameProp } = props;
  const { handleChangeCarouselItemsCount } = useCarouselContext();

  const _children = useMemo(
    () => Children.toArray(children) as ReactElement[],
    [children]
  );

  const carouselItems = useMemo(
    () =>
      _children.filter(
        (child): child is ReactElement<CarouselItemProps & { index: number }> =>
          child.type === CarouselItem
      ),
    [_children]
  );

  const cls = useMemo(
    () => getMergedInjectedClassName(carouselHolderCls, classNameProp),
    [classNameProp]
  );

  const onChangeItemsCount = (count: number) => {
    handleChangeCarouselItemsCount(count);
  };

  useEffect(() => {
    onChangeItemsCount(carouselItems.length);
  }, [carouselItems.length]);
  return (
    <div className={cls}>
      {carouselItems.map((originItem, index) =>
        cloneElement(originItem, {
          ...originItem.props,
          index,
        })
      )}
    </div>
  );
};
export default CarouselHolder;
