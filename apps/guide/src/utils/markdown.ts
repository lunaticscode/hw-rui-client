import { MapComponentToMarkdowns } from "../types/generated-markdown-types";

type CustomMarkdownModule = {
  default: string;
};

const MARKDOWN_FILES_DIRNAME = "markdowns";
const GET_STARTED_DIR_PREFIX = "../pages/get-started/";
const FOUNDATION_DIR_PREFIX = "../pages/foundations/";
const COMPONENT_DIR_PREFIX = "../pages/components/";

export const setProcessedMarkdownString = (md: string) => {
  const startString = md.slice(0, 3);
  if (startString !== "```") {
    return "```" + md + "```";
  }
  return md;
};

const getExampleMarkdownContents = () => {
  const getStartedMarkdownFiles = import.meta.glob(
    "../pages/get-started/**/markdowns/*.md",
    { eager: true }
  );
  const mapGetStartedToMarkdowns: Record<string, Record<string, string>> = {};

  for (const getStartedDir in getStartedMarkdownFiles) {
    const getStartedName = getStartedDir
      .split(GET_STARTED_DIR_PREFIX)[1]
      .split(`/${MARKDOWN_FILES_DIRNAME}`)[0];
    const fileName = getStartedDir
      .split(`${MARKDOWN_FILES_DIRNAME}/`)[1]
      .split(".md")[0];
    mapGetStartedToMarkdowns[getStartedName] = {
      ...mapGetStartedToMarkdowns[getStartedName],
      [fileName]: setProcessedMarkdownString(
        (getStartedMarkdownFiles[getStartedDir] as CustomMarkdownModule).default
      ),
    };
  }

  const foundationMarkdownFiles = import.meta.glob(
    "../pages/foundations/**/markdowns/*.md",
    { eager: true }
  );
  const mapFoundationToMarkdowns: Record<string, Record<string, string>> = {};

  for (const foundationDir in foundationMarkdownFiles) {
    const foundationName = foundationDir
      .split(FOUNDATION_DIR_PREFIX)[1]
      .split(`/${MARKDOWN_FILES_DIRNAME}`)[0];
    const fileName = foundationDir
      .split(`${MARKDOWN_FILES_DIRNAME}/`)[1]
      .split(".md")[0];
    mapFoundationToMarkdowns[foundationName] = {
      ...mapFoundationToMarkdowns[foundationName],
      [fileName]: setProcessedMarkdownString(
        (foundationMarkdownFiles[foundationDir] as CustomMarkdownModule).default
      ),
    };
  }

  const componentMarkdownFiles = import.meta.glob(
    "../pages/components/**/markdowns/*.md",
    { eager: true }
  );

  const mapComponentToMarkdowns = {} as MapComponentToMarkdowns;

  for (const componentDir in componentMarkdownFiles) {
    const componentName = componentDir
      .split(COMPONENT_DIR_PREFIX)[1]
      .split(`/${MARKDOWN_FILES_DIRNAME}`)[0] as keyof MapComponentToMarkdowns;

    const fileName = componentDir
      .split(`${MARKDOWN_FILES_DIRNAME}/`)[1]
      .split(".md")[0];
    mapComponentToMarkdowns[componentName] = {
      ...mapComponentToMarkdowns[componentName],
      [fileName]: setProcessedMarkdownString(
        (componentMarkdownFiles[componentDir] as CustomMarkdownModule).default
      ),
    };
  }
  return {
    GET_STARTED_MARKDOWNS: mapGetStartedToMarkdowns,
    FOUNDATION_MARKDOWNS: mapFoundationToMarkdowns,
    COMPONENT_MARKDOWNS: mapComponentToMarkdowns,
  };
};

export const {
  GET_STARTED_MARKDOWNS,
  FOUNDATION_MARKDOWNS,
  COMPONENT_MARKDOWNS,
} = getExampleMarkdownContents();
