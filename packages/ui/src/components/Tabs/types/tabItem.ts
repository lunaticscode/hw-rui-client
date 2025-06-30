import { FC, PropsWithChildren, ReactNode } from "react";
import { TabsValue } from ".";

type TabsItemRequiredProps = {
  value: TabsValue;
};

type TabsItemOptionalProps = Partial<{
  className: string;
  children:
    | ReactNode
    | ((value: TabsValue, handleClickTabsItem: () => void) => ReactNode);
}>;

export type TabsItemProps = FC<TabsItemOptionalProps & TabsItemRequiredProps>;
