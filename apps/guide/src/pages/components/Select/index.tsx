import Select from "@repo/ui/Select";
import useTranslator from "@layouts/hooks/useTranslator";
import { COMPONENT_MARKDOWNS } from "@utils/markdown";
import { Install, Intro, Usage } from "@layouts/components/guides";
import CodeBlock from "@layouts/components/CodeBlock";
import GuideTitle from "@layouts/components/GuideTitle";
import ExamComponent from "@layouts/components/ExamComponent";

const Guide = () => {
  const { Trans } = useTranslator();

  return (
    <>
      <Intro title={"Select"}>
        <Trans langKey="select-intro" />
      </Intro>
      <Install>
        <CodeBlock code={COMPONENT_MARKDOWNS["Select"]?.Install_Code ?? ""} />
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

        <CodeBlock
          code={COMPONENT_MARKDOWNS["Select"]?.Usage_BasicExample ?? ""}
        />
      </Usage>
    </>
  );
};
export default Guide;
