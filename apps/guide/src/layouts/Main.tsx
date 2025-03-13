import { FC, PropsWithChildren } from "react";

const mainCls = "app-main";
interface MainProps extends PropsWithChildren {}
const Main: FC<MainProps> = (props) => {
  const { children } = props;
  return <main className={mainCls}>{children}</main>;
};
export default Main;
