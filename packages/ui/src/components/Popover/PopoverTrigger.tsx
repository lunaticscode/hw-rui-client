import { cloneElement, forwardRef, JSX, useEffect, useRef } from "react";
import { PopoverTriggerProps } from "./types/popoverTrigger";
import { getMergedInjectedClassName } from "@repo/core/utils";
import { popoverTriggerButtonCls, popoverTriggerCls } from "@repo/core/consts";
import { usePopoverContext } from ".";
import { useMergedRef } from "@repo/core/hooks";

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  (props, ref) => {
    const { className, children } = props;
    const popoverContentSlotRef = useRef<HTMLDivElement>(null);

    const { setTriggerRef, setContentSlotRef, handleClickTrigger } =
      usePopoverContext();
    const internalTriggreRef = useRef(null);
    const triggerRef = useMergedRef(ref, internalTriggreRef);

    useEffect(() => {
      setTriggerRef(internalTriggreRef);
    }, [ref, internalTriggreRef]);

    if (children && typeof children === "function") {
      const newElement = children(internalTriggreRef) as JSX.Element;
      return cloneElement(newElement, {
        ...newElement.props,
        onClick: handleClickTrigger,
        ref: triggerRef,
      });
    }

    useEffect(() => {
      if (popoverContentSlotRef.current) {
        setContentSlotRef(popoverContentSlotRef);
      }
    }, [popoverContentSlotRef]);
    return (
      <>
        <span
          className={getMergedInjectedClassName(popoverTriggerCls, className)}
        >
          <button
            ref={triggerRef}
            onClick={handleClickTrigger}
            className={getMergedInjectedClassName(
              popoverTriggerButtonCls,
              className
            )}
          >
            {children ?? "Popover Open"}
          </button>
        </span>
        <div ref={popoverContentSlotRef} />
      </>
    );
  }
);
export default PopoverTrigger;
