import Calendar from "@repo/ui/Calendar";
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
      <Intro title={"Calendar"}>
        <Trans langKey="calendar-intro" />
      </Intro>
      <Install>
        <CodeBlock code={installCode} />
      </Install>
      <Usage>
        <GuideTitle type="h3">Basic</GuideTitle>
        <ExamComponent>
          <div>
            <Calendar>
              <Calendar.Current />
              <Calendar.Today />
              <Calendar.Modes />
              <Calendar.Navigator />
              <Calendar.Body />
            </Calendar>
          </div>
        </ExamComponent>

        <CodeBlock code={basicExampleCode} />
      </Usage>
    </>
  );
};
export default Guide;
