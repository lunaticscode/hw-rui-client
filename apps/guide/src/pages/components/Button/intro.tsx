import GuideTitle from "@layouts/components/GuideTitle";
import useTranslator from "@layouts/hooks/useTranslator";

const Intro = () => {
  const { Trans } = useTranslator();
  return (
    <>
      <GuideTitle>Button</GuideTitle>
      <Trans langKey="button-intro" />
    </>
  );
};
export default Intro;
