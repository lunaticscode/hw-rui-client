import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import useTranslator from "./hooks/useTranslator";
export type SidebarMenu = {
  href: string;
  label: string;
};

interface SidebarProps {
  menus?: {
    "get-started": SidebarMenu[];
    foundations: SidebarMenu[];
    components: SidebarMenu[];
  };
}

const sidebarCls = "app-sidebar";
const sidebarLogoWrapperCls = "app-sidebar-logo-wrapper";
const sidebarTranslateButtonsWrapperCls =
  "app-sidebar-translate-buttons-wrapper";
const sidebarGroupMenuCls = "app-sidebar-group-menu";
const sidebarGroupDividerCls = "app-sidebar-group-devider";
const sidebarMenuCls = "app-sidebar-menu";
const Sidebar: FC<SidebarProps> = (props) => {
  const pathname = useLocation().pathname;
  const { menus } = props;
  const { language, changeLanguage } = useTranslator();

  return (
    <aside className={sidebarCls}>
      <div className={sidebarLogoWrapperCls}>
        {/* <img src={"/hwrui-logo.webp"} /> */}
        <h3>HW-RUI</h3>
      </div>
      <div className={sidebarTranslateButtonsWrapperCls}>
        <button
          data-active={language === "ko-KR"}
          onClick={() => changeLanguage("ko-KR")}
        >
          🇰🇷
        </button>
        <button
          data-active={language === "en-US"}
          onClick={() => changeLanguage("en-US")}
        >
          🇺🇸
        </button>
      </div>
      <Link
        className={sidebarGroupMenuCls}
        to={"/get-started"}
        data-active={pathname === "/get-started"}
      >
        Get Started
      </Link>
      {menus?.["get-started"]?.map((menu, index) => (
        <Link
          key={`sidebar-menu-get_started-key-${index}`}
          className={sidebarMenuCls}
          data-active={pathname === menu.href}
          to={menu.href}
        >
          {menu.label}
        </Link>
      ))}
      <div className={sidebarGroupDividerCls} />
      <Link
        className={sidebarGroupMenuCls}
        to={"/foundations"}
        data-active={pathname === "/foundations"}
      >
        Foundations
      </Link>
      {menus?.foundations?.map((menu, index) => (
        <Link
          key={`sidebar-menu-foundation-key-${index}`}
          className={sidebarMenuCls}
          data-active={pathname === menu.href}
          to={menu.href}
        >
          {menu.label}
        </Link>
      ))}
      <div className={sidebarGroupDividerCls} />
      <Link
        className={sidebarGroupMenuCls}
        to={"/components"}
        data-active={pathname === "/components"}
      >
        Components
      </Link>
      {menus?.components?.map((menu, index) => (
        <Link
          key={`sidebar-menu-component-key-${index}`}
          className={sidebarMenuCls}
          data-active={pathname === menu.href}
          to={menu.href}
        >
          {menu.label}
        </Link>
      ))}
    </aside>
  );
};
export default Sidebar;
