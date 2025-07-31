import { useMemo } from "react";
import { CarouselNavigatorProps } from "./types/carouselNavigator.type";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { carouselNavigatorCls } from "@hw-rui/core/consts";
import { useCarouselContext } from ".";

const CarouselNavigator: CarouselNavigatorProps = (props) => {
  const { className: classNameProp, children } = props;
  const { handleClickNavigator } = useCarouselContext();

  const prev = () => {
    handleClickNavigator(-1);
  };
  const next = () => {
    handleClickNavigator(1);
  };

  if (children && typeof children === "function") {
    return children(prev, next);
  }

  const cls = useMemo(
    () => getMergedInjectedClassName(carouselNavigatorCls, classNameProp),
    [classNameProp]
  );
  return (
    <div className={cls}>
      <button onClick={prev} className={`${cls}-prev-button`}>
        prev
      </button>
      <button onClick={next} className={`${cls}-next-button`}>
        next
      </button>
    </div>
  );
};
export default CarouselNavigator;
