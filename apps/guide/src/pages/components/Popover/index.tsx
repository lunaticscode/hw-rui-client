import Popover from "@repo/ui/Popover";
import useTranslator from "@layouts/hooks/useTranslator";
import { Ref, RefObject, useEffect, useState } from "react";
import { setProcessedMarkdownString } from "@utils/markdown";
import { Install, Intro, Usage } from "@layouts/components/guides";
import CodeBlock from "@layouts/components/CodeBlock";
import GuideTitle from "@layouts/components/GuideTitle";
import ExamComponent from "@layouts/components/ExamComponent";
import Button from "@repo/ui/Button";
import GuideDivider from "@layouts/components/GuideDivider";

const Guide = () => {
  const { Trans } = useTranslator();
  const [basicExampleCode, setBasicExampleCode] = useState<string>("");
  const [customTriggerExampleCode, setCustomTriggerExampleCode] =
    useState<string>("");
  const [installCode, setInstallCode] = useState("");

  const setUsageCodes = () => {
    import("./markdowns/Usage_BasicExample.md")
      .then((res) => {
        return res.default;
      })
      .then((res) => {
        setBasicExampleCode(setProcessedMarkdownString(res));
      });
    import("./markdowns/Usage_CustomTrigger.md")
      .then((res) => {
        return res.default;
      })
      .then((res) => {
        setCustomTriggerExampleCode(setProcessedMarkdownString(res));
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

        <GuideDivider />

        <GuideTitle type="h3">Custom Trigger</GuideTitle>
        <ExamComponent>
          <div>
            <Popover>
              <Popover.Trigger>
                {(triggerRef) => (
                  <Button ref={triggerRef} variant="positive">
                    custom-trigger
                  </Button>
                )}
              </Popover.Trigger>
              <Popover.Content>popover-custom-content</Popover.Content>
            </Popover>
          </div>
        </ExamComponent>

        <CodeBlock code={customTriggerExampleCode} />
      </Usage>
    </>
  );
};
export default Guide;
