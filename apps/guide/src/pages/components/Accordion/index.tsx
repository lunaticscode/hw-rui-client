import {
  Accessbility,
  Install,
  Intro,
  Notes,
  Props,
  Usage,
} from "@layouts/components/guides";
import CodeBlock from "@layouts/components/CodeBlock";
import GuideTitle from "@layouts/components/GuideTitle";
import useTranslator from "@layouts/hooks/useTranslator";
import { COMPONENT_MARKDOWNS } from "@utils/markdown";
import ExamComponent from "@layouts/components/ExamComponent";
import Accordion from "@repo/ui/Accordion";

const Guide = () => {
  const { Trans } = useTranslator();

  return (
    <>
      <Intro title={"Accordion"}>
        <Trans langKey="accordion-intro" />
      </Intro>
      <Install>
        <CodeBlock
          code={COMPONENT_MARKDOWNS["Accordion"]?.Install_Code ?? ""}
        />
      </Install>
      <Usage>
        <GuideTitle type="h3">Basic</GuideTitle>
        <ExamComponent>
          <Accordion>
            <Accordion.Trigger id="section1">Section 1</Accordion.Trigger>
            <Accordion.Region id="section1">
              <p>This is the content of Section 1.</p>
            </Accordion.Region>
            <Accordion.Trigger id="section2">Section 2</Accordion.Trigger>
            <Accordion.Region id="section2">
              <p>This is the content of Section 2.</p>
            </Accordion.Region>
          </Accordion>
        </ExamComponent>
        <CodeBlock
          code={COMPONENT_MARKDOWNS["Accordion"]?.Usage_BasicExample ?? ""}
        />
      </Usage>
      <Props />
      <Notes />
      <Accessbility />
    </>
  );
};
export default Guide;
