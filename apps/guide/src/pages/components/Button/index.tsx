import useTranslator from "@layouts/hooks/useTranslator";
import { useEffect, useState } from "react";
import { setProcessedMarkdownString } from "@utils/markdown";
import { Install, Intro, Usage } from "@layouts/components/guides";
import CodeBlock from "@layouts/components/CodeBlock";
import GuideTitle from "@layouts/components/GuideTitle";
import ExamComponent from "@layouts/components/ExamComponent";
import Button from "@repo/ui/Button";

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
      <Intro title={"Button"}>
        <Trans langKey="button-intro" />
      </Intro>
      <Install>
        <CodeBlock code={installCode} />
      </Install>
      <Usage>
        <GuideTitle type="h3">Basic</GuideTitle>
        <ExamComponent>
          <div>
            <Button>Default</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="positive">Positive</Button>
            <Button variant="negative">Negative</Button>
          </div>
        </ExamComponent>

        <CodeBlock code={basicExampleCode} />
      </Usage>
    </>
  );
};
export default Guide;
