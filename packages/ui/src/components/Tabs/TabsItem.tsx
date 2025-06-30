import { useMemo } from "react";
import { TabsItemProps } from "./types/tabItem";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { tabsItemCls } from "@hw-rui/core/consts";
import { useTabsContext } from ".";

const TabsItem: TabsItemProps = (props) => {
  const { handleChangeSelectedValue, selectedValue } = useTabsContext();
  const { value: valueProp, children, className: classNameProp } = props;

  const handleClickTabsItem = () => {
    handleChangeSelectedValue(valueProp);
  };

  if (children && typeof children === "function") {
    return children(valueProp, handleClickTabsItem);
  }

  const cls = useMemo(
    () => getMergedInjectedClassName(tabsItemCls, classNameProp),
    [classNameProp]
  );

  return (
    <div
      data-active={valueProp === selectedValue}
      className={cls}
      onClick={handleClickTabsItem}
    >
      {children}
    </div>
  );
};

export default TabsItem;
