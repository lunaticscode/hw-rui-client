import { cloneElement, forwardRef, JSX, Ref, useEffect, useRef } from "react";
import { PopoverTriggerProps } from "./types/popoverTrigger";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import {
  popoverTriggerButtonCls,
  popoverTriggerCls,
} from "@hw-rui/core/consts";
import { usePopoverContext } from ".";
import { useMergedRef } from "@hw-rui/core/hooks";

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  (props, ref) => {
    const { className, children } = props;

    const { setTriggerRef, handleClickTrigger } = usePopoverContext();
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

    return (
      <>
        <span
          className={getMergedInjectedClassName(popoverTriggerCls, className)}
        >
          <button
            ref={triggerRef as Ref<any>}
            onClick={handleClickTrigger}
            className={getMergedInjectedClassName(
              popoverTriggerButtonCls,
              className
            )}
          >
            {children ?? "Popover Open"}
          </button>
        </span>
      </>
    );
  }
);
export default PopoverTrigger;
