import { FC, PropsWithChildren } from "react";

const titleIntroCls = "app-intro-title";
interface IntroTitleProps extends PropsWithChildren {}
const IntroTitle: FC<IntroTitleProps> = ({ children }) => {
  return <h2 className={titleIntroCls}>{children}</h2>;
};
export default IntroTitle;
