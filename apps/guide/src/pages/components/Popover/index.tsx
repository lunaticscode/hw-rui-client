import Popover from "@repo/ui/Popover";
import useTranslator from "@layouts/hooks/useTranslator";
import { Install, Intro, Usage } from "@layouts/components/guides";
import CodeBlock from "@layouts/components/CodeBlock";
import GuideTitle from "@layouts/components/GuideTitle";
import ExamComponent from "@layouts/components/ExamComponent";
import Button from "@repo/ui/Button";
import GuideDivider from "@layouts/components/GuideDivider";
import { COMPONENT_MARKDOWNS } from "@utils/markdown";

const Guide = () => {
  const { Trans } = useTranslator();

  return (
    <>
      <Intro title={"Popover"}>
        <Trans langKey="popover-intro" />
      </Intro>
      <Install>
        <CodeBlock code={COMPONENT_MARKDOWNS["Popover"]?.Install_Code ?? ""} />
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

        <CodeBlock
          code={COMPONENT_MARKDOWNS["Popover"]?.Usage_BasicExample ?? ""}
        />

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

        <CodeBlock
          code={COMPONENT_MARKDOWNS["Popover"]?.Usage_CustomTrigger ?? ""}
        />
      </Usage>
    </>
  );
};
export default Guide;
