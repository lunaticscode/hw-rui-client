import { FC, PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import Content from "./Main";
import { routeMenus } from "./utils/getGuideFiles";

interface LayoutProps extends PropsWithChildren {}
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Sidebar menus={routeMenus} />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
