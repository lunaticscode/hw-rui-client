import Tabs from "@repo/ui/Tabs";
import { Intro, Install, Usage } from "@layouts/components/guides";
import useTranslator from "@layouts/hooks/useTranslator";
import CodeBlock from "@layouts/components/CodeBlock";
import { useEffect, useState } from "react";
import { setProcessedMarkdownString } from "@utils/markdown";
import GuideTitle from "@layouts/components/GuideTitle";
import ExamComponent from "@layouts/components/ExamComponent";

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
      <Intro title={"Tabs"}>
        <Trans langKey="tabs-intro" />
      </Intro>
      <Install>
        <CodeBlock code={installCode} />
      </Install>
      <Usage>
        <GuideTitle type="h3">Basic</GuideTitle>
        <ExamComponent>
          <div>
            <Tabs defaultValue={"item-2"}>
              <Tabs.Item value={"item-1"}>menu 1</Tabs.Item>
              <Tabs.Item value={"item-2"}>menu 2</Tabs.Item>
              <Tabs.Item value={"item-3"}>menu 3</Tabs.Item>
            </Tabs>
          </div>
        </ExamComponent>

        <CodeBlock code={basicExampleCode} />
      </Usage>
    </>
  );
};
export default Guide;
