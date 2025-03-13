import GuideTitle from "@layouts/components/GuideTitle";
import useTranslator from "@layouts/hooks/useTranslator";

const Intro = () => {
  const { Trans } = useTranslator();
  return (
    <>
      <GuideTitle>Toast</GuideTitle>
      <Trans langKey="toast-intro" />
    </>
  );
};
export default Intro;
