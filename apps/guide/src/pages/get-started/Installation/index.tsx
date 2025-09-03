import CodeBlock from "@layouts/components/CodeBlock";
import GuideDivider from "@layouts/components/GuideDivider";
import GuideTitle from "@layouts/components/GuideTitle";
import { GET_STARTED_MARKDOWNS } from "@utils/markdown";

const Installed = () => {
  return (
    <>
      <GuideTitle>Install CLI</GuideTitle>
      <CodeBlock
        code={GET_STARTED_MARKDOWNS["Installation"]?.Install_Cli ?? ""}
      />
      <GuideDivider />
      <GuideTitle>Initialize</GuideTitle>
      <CodeBlock code={GET_STARTED_MARKDOWNS["Installation"]?.Init ?? ""} />
      <GuideTitle type={"h4"}>{`> Select BaseColor`}</GuideTitle>
      <CodeBlock
        noCopy
        code={GET_STARTED_MARKDOWNS["Installation"]?.BaseColor_Prompt ?? ""}
      />
      <GuideTitle type={"h4"}>{`> Check created manifest file.`}</GuideTitle>
      <CodeBlock
        noCopy
        code={GET_STARTED_MARKDOWNS["Installation"]?.Created_Manifest ?? ""}
      />
    </>
  );
};
export default Installed;
