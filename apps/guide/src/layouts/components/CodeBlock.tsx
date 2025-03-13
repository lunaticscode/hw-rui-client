import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FC } from "react";

interface CodeBlockProps {
  code?: string;
}
const CodeBlock: FC<CodeBlockProps> = ({ code }) => {
  const handleClickCopy = () => {
    if (!code) return;
    const filteredCode = code.replace(/```[a-zA-Z]+\n|```/g, "");
    window.navigator.clipboard.writeText(filteredCode.trim());
  };
  return (
    <>
      <div className={"app-guide-codeblock-copy-button"}>
        <button onClick={handleClickCopy}>copy</button>
      </div>
      <ReactMarkdown
        components={{
          code: (props: any) => {
            const match = /language-(\w+)/.exec(props.className || "");
            return (
              <SyntaxHighlighter
                children={String(props.children).replace(/\n$/, "")}
                style={vscDarkPlus}
                language={match?.[1] || "text"}
                PreTag="div"
                {...props}
              />
            );
          },
        }}
        remarkPlugins={[remarkGfm]}
      >
        {code}
      </ReactMarkdown>
    </>
  );
};

export default CodeBlock;
