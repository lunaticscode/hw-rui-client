import { FC, PropsWithChildren } from "react";
import GuideTitle from "@layouts/components/GuideTitle";
import GuideDivider from "@layouts/components/GuideDivider";
interface UsageProps extends PropsWithChildren {}
const Usage: FC<UsageProps> = ({ children }) => {
  return (
    <>
      <GuideDivider />
      <GuideTitle>Usage</GuideTitle>
      {children}
    </>
  );
};
export default Usage;
