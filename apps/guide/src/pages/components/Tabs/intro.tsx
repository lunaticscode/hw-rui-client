import GuideTitle from "@layouts/components/GuideTitle";
import useTranslator from "@layouts/hooks/useTranslator";

const Intro = () => {
  const { Trans } = useTranslator();
  return (
    <>
      <GuideTitle>Calendar</GuideTitle>
      <Trans langKey="button-intro" />
    </>
  );
};
export default Intro;
