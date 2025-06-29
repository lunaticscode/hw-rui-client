import {
  createContext,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  RefObject,
  useImperativeHandle,
  useState,
} from "react";
import { PopoverProps, PopoverContextProps, PopoverRefProps } from "./types";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { popoverCls } from "@hw-rui/core/consts";
import { popoverDefaultProps } from "./consts/defaultProps";
import PopoverContent from "./PopoverContent";
import PopoverTrigger from "./PopoverTrigger";
import { useUIContext } from "@hw-rui/core/hooks";

const PopoverContext = createContext<PopoverContextProps | null>(null);

export const usePopoverContext = () =>
  useUIContext(PopoverContext, "PopoverContext");

interface PopoverCompoundProps
  extends ForwardRefExoticComponent<PopoverProps & RefAttributes<HTMLElement>> {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
}

const PopoverForwardRef = forwardRef<PopoverRefProps, PopoverProps>(
  (props, ref) => {
    const { className, children, ...controlledProps } = props;
    const {
      open: _openProp,
      onOpen: _onOpenProp,
      position,
    } = {
      ...popoverDefaultProps,
      ...controlledProps,
    };

    const [contentSlotRef, setContentSlotRef] = useState<
      RefObject<HTMLElement | null>
    >({ current: null });
    const [open, setOpen] = useState<boolean>(false);
    const [triggerRef, setTriggerRef] = useState<RefObject<HTMLElement | null>>(
      {
        current: null,
      }
    );

    const closeByTrigger = () => {
      setOpen(false);
    };

    useImperativeHandle(ref, () => ({
      close: () => closeByTrigger(),
    }));

    const handleClickTrigger = () => {
      setOpen(!open);
    };

    const handleContentOpen = () => {
      setOpen(true);
    };

    const handleContentClose = () => {
      setOpen(false);
    };

    const popoverContextValue: PopoverContextProps = {
      open,
      triggerRef,
      contentSlotRef,
      position,
      setTriggerRef,
      setContentSlotRef,
      handleContentOpen,
      handleContentClose,
      handleClickTrigger,
    };

    return (
      <PopoverContext.Provider value={popoverContextValue}>
        <div className={getMergedInjectedClassName(popoverCls, className)}>
          {children}
        </div>
      </PopoverContext.Provider>
    );
  }
);

const Popover = {
  ...PopoverForwardRef,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
} as PopoverCompoundProps;
// Popover.Trigger = PopoverTrigger;
// Popover.Content = PopoverContent;
export default Popover;
Popover.displayName = "Popover";
