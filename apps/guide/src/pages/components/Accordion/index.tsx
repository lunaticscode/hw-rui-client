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
import { setProcessedMarkdownString } from "@utils/markdown";
import ExamComponent from "@layouts/components/ExamComponent";
import Accordion from "@repo/ui/Accordion";

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
        <ExamComponent>
          <Accordion>
            <Accordion.Trigger id="section1">Section 1</Accordion.Trigger>
            <Accordion.Region id="section1">
              <p>This is the content of Section 1.</p>
            </Accordion.Region>
            <Accordion.Trigger id="section2">Section 2</Accordion.Trigger>
            <Accordion.Region id="section2">
              <p>This is the content of Section 2.</p>
            </Accordion.Region>
          </Accordion>
        </ExamComponent>
        <CodeBlock code={basicExampleCode} />
      </Usage>
      <Props />
      <Notes />
      <Accessbility />
    </>
  );
};
export default Guide;
