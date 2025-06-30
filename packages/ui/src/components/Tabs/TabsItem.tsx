import { useMemo } from "react";
import { TabsItemProps } from "./types/tabItem";
import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { tabsItemCls } from "@hw-rui/core/consts";
import { useTabsContext } from ".";

const TabsItem: TabsItemProps = (props) => {
  const { handleChangeSelectedValue } = useTabsContext();
  const { value, children, className: classNameProp } = props;

  const handleClickTabsItem = () => {
    handleChangeSelectedValue(value);
  };

  if (children && typeof children === "function") {
    return children(value, handleClickTabsItem);
  }

  const cls = useMemo(
    () => getMergedInjectedClassName(tabsItemCls, classNameProp),
    [classNameProp]
  );

  return <div className={cls}>{children}</div>;
};

export default TabsItem;
