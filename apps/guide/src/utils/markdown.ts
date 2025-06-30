export const setProcessedMarkdownString = (md: string) => {
  const startString = md.slice(0, 3);
  if (startString !== "```") {
    return "```" + md + "```";
  }
  return md;
};
