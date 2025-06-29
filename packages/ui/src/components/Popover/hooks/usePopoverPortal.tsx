import { FC, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PopoverContentPositions } from "../types";
import { PopoverContentPortalProps } from "../types/popoverContent";
import { useOutsideClick } from "@hw-rui/core/hooks";
import { usePopoverContext } from "..";

type ContentPositionValue = { x: number; y: number };
const getContentPosition = (
  rect: DOMRect,
  position: PopoverContentPositions
) => {
  const { x: tx, y: ty, width: tw, height: th } = rect;
  const mapPositionToXYPos: {
    [key in PopoverContentPositions]: ContentPositionValue;
  } = {
    "bottom-left": { x: 0, y: th },
    "bottom-right": { x: 0, y: th },
    "top-left": { x: tx, y: ty - th },
    "top-right": { x: tw + tx, y: ty - th },
  };
  return mapPositionToXYPos[position];
};

const usePopoverPortal = (
  triggerRef: RefObject<HTMLElement | null>,
  positionType: PopoverContentPositions
) => {
  const [position, setPosition] = useState<ContentPositionValue>({
    x: 0,
    y: 0,
  });
  const setContentPosition = useCallback(
    (triggerElem: HTMLElement) => {
      const newPosition = getContentPosition(
        triggerElem.getBoundingClientRect() ?? new DOMRect(),
        positionType
      );
      setPosition(newPosition);
    },
    [position, triggerRef.current]
  );

  const handleResize = () => {
    if (triggerRef.current) {
      setContentPosition(triggerRef.current);
    }
  };

  useEffect(() => {
    if (triggerRef.current) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [triggerRef.current]);

  useEffect(() => {
    if (triggerRef.current) {
      setContentPosition(triggerRef.current);
    }
  }, [triggerRef.current]);

  const Portal: FC<PopoverContentPortalProps> = useCallback(
    ({ className, children, ...controlledProps }) => {
      const contentPortalRef = useRef<HTMLDivElement>(null);
      const { handleContentClose, contentSlotRef } = usePopoverContext();
      const { setTargetRef, isOutside } = useOutsideClick();

      useEffect(() => {
        if (contentPortalRef.current) {
          setTargetRef(contentPortalRef);
        }
      }, [contentPortalRef.current]);

      useEffect(() => {
        if (isOutside && contentPortalRef.current) {
          handleContentClose();
        }
      }, [isOutside]);

      return createPortal(
        <div
          {...controlledProps}
          ref={contentPortalRef}
          className={className}
          style={{
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,
          }}
        >
          {children}
        </div>,
        contentSlotRef.current as HTMLElement
      );
    },
    [position]
  );

  return Portal;
};

export default usePopoverPortal;
