import { FC } from "react";
import { usePopoverContext } from ".";
import usePopoverPortal from "./hooks/usePopoverPortal";
import { PopoverContentProps } from "./types/popoverContent";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { popoverContentCls } from "@hw-rui/core/consts";

const PopoverContent: FC<PopoverContentProps> = (props) => {
  const { className, children, ...controlledProps } = props;
  const { triggerRef, position, open } = usePopoverContext();

  const Portal = usePopoverPortal(triggerRef, position);

  return open ? (
    <Portal
      {...controlledProps}
      aria-expanded={open ?? false}
      data-expanded={open ?? false}
      className={getMergedInjectedClassName(popoverContentCls, className)}
    >
      {children}
    </Portal>
  ) : null;
};
export default PopoverContent;
