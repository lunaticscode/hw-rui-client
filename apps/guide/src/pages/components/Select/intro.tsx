import GuideTitle from "@layouts/components/GuideTitle";
import useTranslator from "@layouts/hooks/useTranslator";

const Intro = () => {
  const { Trans } = useTranslator();
  return (
    <>
      <GuideTitle>Select</GuideTitle>
      <Trans langKey="select-intro" />
    </>
  );
};
export default Intro;
