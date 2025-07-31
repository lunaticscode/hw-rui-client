import Popover from "@repo/ui/Popover";
import useTranslator from "@layouts/hooks/useTranslator";
import { useEffect, useState } from "react";
import { setProcessedMarkdownString } from "@utils/markdown";
import { Install, Intro, Usage } from "@layouts/components/guides";
import CodeBlock from "@layouts/components/CodeBlock";
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
      <Intro title={"Popover"}>
        <Trans langKey="popover-intro" />
      </Intro>
      <Install>
        <CodeBlock code={installCode} />
      </Install>
      <Usage>
        <GuideTitle type="h3">Basic</GuideTitle>
        <ExamComponent>
          <div>
            <Popover>
              <Popover.Trigger>popover-trigger</Popover.Trigger>
              <Popover.Content>popover-content</Popover.Content>
            </Popover>
          </div>
        </ExamComponent>

        <CodeBlock code={basicExampleCode} />
      </Usage>
    </>
  );
};
export default Guide;
