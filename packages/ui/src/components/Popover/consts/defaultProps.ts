import { PopoverControlledOptionalProps } from "../types";

export const popoverDefaultProps: Required<PopoverControlledOptionalProps> = {
  onOpen: () => {},
  open: false,
  position: "bottom-left",
};
