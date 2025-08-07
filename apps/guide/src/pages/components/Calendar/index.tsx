import Calendar from "@repo/ui/Calendar";
import { Intro, Install, Usage } from "@layouts/components/guides";
import useTranslator from "@layouts/hooks/useTranslator";
import CodeBlock from "@layouts/components/CodeBlock";
import { COMPONENT_MARKDOWNS } from "@utils/markdown";
import GuideTitle from "@layouts/components/GuideTitle";
import ExamComponent from "@layouts/components/ExamComponent";

const Guide = () => {
  const { Trans } = useTranslator();

  return (
    <>
      <Intro title={"Calendar"}>
        <Trans langKey="calendar-intro" />
      </Intro>
      <Install>
        <CodeBlock code={COMPONENT_MARKDOWNS["Calendar"]?.Install_Code ?? ""} />
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

        <CodeBlock
          code={COMPONENT_MARKDOWNS["Calendar"]?.Usage_BasicExample ?? ""}
        />
      </Usage>
    </>
  );
};
export default Guide;
