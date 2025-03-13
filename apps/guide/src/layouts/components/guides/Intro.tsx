import GuideTitle from "@layouts/components/GuideTitle";
import { FC, PropsWithChildren, ReactNode } from "react";
interface IntroProps extends PropsWithChildren {
  title: ReactNode;
}
const Intro: FC<IntroProps> = (props) => {
  const { title, children } = props;
  return (
    <>
      <GuideTitle>{title}</GuideTitle>
      {children}
    </>
  );
};
export default Intro;
