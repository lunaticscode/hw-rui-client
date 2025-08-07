import Tabs from "@repo/ui/Tabs";
import { Intro, Install, Usage } from "@layouts/components/guides";
import useTranslator from "@layouts/hooks/useTranslator";
import CodeBlock from "@layouts/components/CodeBlock";
import GuideTitle from "@layouts/components/GuideTitle";
import ExamComponent from "@layouts/components/ExamComponent";
import { COMPONENT_MARKDOWNS } from "@utils/markdown";

const Guide = () => {
  const { Trans } = useTranslator();

  return (
    <>
      <Intro title={"Tabs"}>
        <Trans langKey="tabs-intro" />
      </Intro>
      <Install>
        <CodeBlock code={COMPONENT_MARKDOWNS["Tabs"]?.Install_Code ?? ""} />
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

        <CodeBlock
          code={COMPONENT_MARKDOWNS["Tabs"]?.Usage_BasicExample ?? ""}
        />
      </Usage>
    </>
  );
};
export default Guide;
