import useTranslator from "@layouts/hooks/useTranslator";
import { Install, Intro, Usage } from "@layouts/components/guides";
import CodeBlock from "@layouts/components/CodeBlock";
import GuideTitle from "@layouts/components/GuideTitle";
import ExamComponent from "@layouts/components/ExamComponent";
import Button from "@repo/ui/Button";
import { COMPONENT_MARKDOWNS } from "@utils/markdown";

const Guide = () => {
  const { Trans } = useTranslator();

  return (
    <>
      <Intro title={"Button"}>
        <Trans langKey="button-intro" />
      </Intro>
      <Install>
        <CodeBlock code={COMPONENT_MARKDOWNS.Button?.["Install_Code"] ?? ""} />
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

        <CodeBlock
          code={COMPONENT_MARKDOWNS.Button?.["Usage_BasicExample"] ?? ""}
        />
      </Usage>
    </>
  );
};
export default Guide;
