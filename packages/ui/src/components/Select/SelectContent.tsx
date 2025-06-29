import { FC } from "react";
import { SelectContentProps } from "./types/selectContent";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { selectContentCls } from "@hw-rui/core/consts";
import PopoverContent from "../Popover/PopoverContent";

const SelectContent: FC<SelectContentProps> = (props) => {
  const { children, className } = props;
  return (
    <PopoverContent
      className={getMergedInjectedClassName(selectContentCls, className)}
    >
      {children}
    </PopoverContent>
  );
};
export default SelectContent;
