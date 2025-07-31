import type {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  PropsWithChildren,
  RefObject,
  SetStateAction,
} from "react";

export type PopoverContentPositions =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

export type PopoverControlledOptionalProps = Partial<{
  onOpen: (open: boolean) => void;
  open: boolean;
  position: PopoverContentPositions;
}>;

export type PopoverControlledRequiredProps = {};

export type PopoverProps = PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  PopoverControlledOptionalProps &
  PopoverControlledRequiredProps;

export type PopoverContextProps = {
  open: boolean;
  triggerRef: RefObject<
    HTMLElement | HTMLButtonElement | HTMLDivElement | null
  >;
  contentSlotRef: RefObject<HTMLElement | null>;
  position: PopoverContentPositions;
  setTriggerRef: Dispatch<SetStateAction<RefObject<HTMLElement | null>>>;
  setContentSlotRef: Dispatch<SetStateAction<RefObject<HTMLElement | null>>>;
  handleContentOpen: () => void;
  handleContentClose: () => void;
  handleClickTrigger: () => void;
};
