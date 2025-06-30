import { getMergedInjectedClassName } from "@hw-rui/core/utils";
import { TabsContextProps, TabsProps, TabsValue } from "./types";
import { tabsCls } from "@hw-rui/core/consts";
import { createContext, useMemo } from "react";
import { useControlledValue, useUIContext } from "@hw-rui/core/hooks";
import TabsItem from "./TabsItem";

interface TabsCompoundProps {
  Item: typeof TabsItem;
}
const TabsContext = createContext<TabsContextProps | null>(null);
export const useTabsContext = () => useUIContext(TabsContext);

const Tabs: TabsProps & TabsCompoundProps = (props) => {
  const {
    className: classNameProp,
    children,
    value: valueProp,
    defaultValue: defaultValueProp = "",
  } = props;
  const { value: selectedValue, setValue: setSelectedValue } =
    useControlledValue(valueProp, defaultValueProp);

  const cls = useMemo(
    () => getMergedInjectedClassName(tabsCls, classNameProp),
    [classNameProp]
  );

  const handleChangeSelectedValue = (changedValue: TabsValue) => {
    setSelectedValue(changedValue);
  };

  const contextValue: TabsContextProps = useMemo(
    () => ({
      selectedValue: selectedValue ?? "",
      handleChangeSelectedValue,
    }),
    [selectedValue]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cls}>{children}</div>
    </TabsContext.Provider>
  );
};
Tabs.Item = TabsItem;
export default Tabs;
