import { FC, PropsWithChildren } from "react";
import GuideTitle from "../GuideTitle";
import GuideDivider from "../GuideDivider";

interface InstallProps extends PropsWithChildren {}
const Install: FC<InstallProps> = ({ children }) => {
  return (
    <>
      <GuideDivider />
      <GuideTitle>Install</GuideTitle>
      {children}
    </>
  );
};
export default Install;
