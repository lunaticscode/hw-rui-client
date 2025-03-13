import {
  Accessbility,
  Install,
  Intro,
  Notes,
  Props,
  Usage,
} from "@layouts/components/guides";
import CodeBlock from "@layouts/components/CodeBlock";
import GuideTitle from "@layouts/components/GuideTitle";
import useTranslator from "@layouts/hooks/useTranslator";
import { useEffect, useState } from "react";

const setProcessedMarkdownString = (md: string) => {
  const startString = md.slice(0, 3);
  if (startString !== "```") {
    return "```" + md + "```";
  }
  return md;
};

const Guide = () => {
  const { Trans } = useTranslator();
  const [basicExampleCode, setBasicExampleCode] = useState("");
  const [installCode, setInstallCode] = useState("");
  const setUsageCodes = () => {
    import("./markdowns/Usage_BasicExample.md")
      .then((res) => {
        return res.default;
      })
      .then((res) => {
        setBasicExampleCode(setProcessedMarkdownString(res));
      });
  };
  const setInstallCodes = () => {
    import("./markdowns/Install_Code.md")
      .then((res) => res.default)
      .then((res) => setInstallCode(res));
  };
  useEffect(() => {
    setUsageCodes();
    setInstallCodes();
  }, []);
  return (
    <>
      <Intro title={"Accordion"}>
        <Trans langKey="accordion-intro" />
      </Intro>
      <Install>
        <CodeBlock code={installCode} />
      </Install>
      <Usage>
        <GuideTitle type="h3">Basic</GuideTitle>
        <CodeBlock code={basicExampleCode} />
      </Usage>
      <Props />
      <Notes />
      <Accessbility />
    </>
  );
};
export default Guide;
