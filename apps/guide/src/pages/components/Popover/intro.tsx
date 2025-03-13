import GuideTitle from "@layouts/components/GuideTitle";
import useTranslator from "@layouts/hooks/useTranslator";

const Intro = () => {
  const { Trans } = useTranslator();
  return (
    <>
      <GuideTitle>Popover</GuideTitle>
      <Trans langKey="popover-intro" />
    </>
  );
};
export default Intro;
