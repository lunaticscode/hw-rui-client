import { FC, PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import Content from "./Main";
import { routeMenus } from "./utils/getGuideFiles";
import useInternalSeo from "./hooks/useInternalSeo";
import useTempRedirect from "./hooks/useTempRedirect";
interface LayoutProps extends PropsWithChildren {}
const Layout: FC<LayoutProps> = ({ children }) => {
  useTempRedirect();
  useInternalSeo();
  return (
    <>
      <Sidebar menus={routeMenus} />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
