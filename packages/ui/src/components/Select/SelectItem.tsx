import { FC, useMemo } from "react";
import { SelectItemProps } from "./types/selectItem";
import { useSelectContext } from ".";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { selectItemCls } from "@hw-rui/core/consts";

const SelectItem: FC<SelectItemProps> = (props) => {
  const { selectedValue, handleChangeSelectedValue } = useSelectContext();
  const { children, className, value } = props;

  const isSelected = useMemo(
    () => selectedValue === value,
    [selectedValue, value]
  );

  const handleClickSelectItem = () => {
    handleChangeSelectedValue(value, children);
  };

  return (
    <div
      className={getMergedInjectedClassName(selectItemCls, className)}
      aria-selected={isSelected ?? false}
      data-selected={isSelected ?? false}
      data-value={value}
      onClick={handleClickSelectItem}
    >
      {children}
    </div>
  );
};
export default SelectItem;
