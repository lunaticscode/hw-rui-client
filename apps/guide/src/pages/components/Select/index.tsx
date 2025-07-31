import Select from "@repo/ui/Select";
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
      <Intro title={"Select"}>
        <Trans langKey="select-intro" />
      </Intro>
      <Install>
        <CodeBlock code={installCode} />
      </Install>
      <Usage>
        <GuideTitle type="h3">Basic</GuideTitle>
        <ExamComponent>
          <div>
            <Select>
              <Select.Trigger>
                <Select.SelectedValue />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value={"a"}>item-a</Select.Item>
                <Select.Item value={"b"}>item-b</Select.Item>
                <Select.Item value={"c"}>item-c</Select.Item>
              </Select.Content>
            </Select>
          </div>
        </ExamComponent>

        <CodeBlock code={basicExampleCode} />
      </Usage>
    </>
  );
};
export default Guide;
