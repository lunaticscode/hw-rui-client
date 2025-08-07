import prompts from "prompts";

process.on("SIGINT", () => {
  console.log("(!) Exit process from [ctrl + c].");
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("(!) Exit process from forced terminate process.");
  process.exit(1);
});

const runPromptCommand = async () => {
  const { input } = await prompts({
    type: "text",
    name: "input",
    message: "Describe what UI you need.",
  });
  console.log(input);
};
export default runPromptCommand;
