import { FC } from "react";
import { SelectTriggerProps } from "./types/selectTrigger";
import PopoverTrigger from "../Popover/PopoverTrigger";
import { getMergedInjectedClassName } from "@repo/core/utils";
import { selectTriggerCls } from "@repo/core/consts";

const SelectTrigger: FC<SelectTriggerProps> = (props) => {
  const { children, className } = props;
  return (
    <PopoverTrigger
      className={getMergedInjectedClassName(selectTriggerCls, className)}
    >
      {children}
    </PopoverTrigger>
  );
};
export default SelectTrigger;
