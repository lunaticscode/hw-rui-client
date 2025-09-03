import { SidebarMenu } from "@layouts/Sidebar";
import { JSX } from "react";

type CustomElementType = () => JSX.Element;
type CustomRouteModule = {
  default: CustomElementType;
};

export type CustomRoutes = {
  path: string;
  Element: CustomElementType;
  importer: () => Promise<unknown>;
};

const PARENT_DIR_NAME = "pages";
type GuideTypes = "foundations" | "components" | "get-started";
const GUIDE_GET_STARTED_DIR = `/${PARENT_DIR_NAME}/get-started/`;
const GUIDE_FOUNDATIONS_DIR = `/${PARENT_DIR_NAME}/foundations/`;
const GUIDE_COMPONENTS_DIR = `/${PARENT_DIR_NAME}/components/`;

export const getStartedPageMap = import.meta.glob(
  "../../pages/get-started/**/index.tsx"
);
export const foundationPageMap = import.meta.glob(
  "../../pages/foundations/**/index.tsx"
);
export const componentPageMap = import.meta.glob(
  "../../pages/components/**/index.tsx"
);

const mapGuideTypeToDir: { [key in GuideTypes]: string } = {
  foundations: GUIDE_FOUNDATIONS_DIR,
  components: GUIDE_COMPONENTS_DIR,
  "get-started": GUIDE_GET_STARTED_DIR,
};

const getGuideType = (fileName: string): GuideTypes => {
  if (fileName.includes(GUIDE_COMPONENTS_DIR)) {
    return "components";
  }
  if (fileName.includes(GUIDE_FOUNDATIONS_DIR)) {
    return "foundations";
  }
  if (fileName.includes(GUIDE_GET_STARTED_DIR)) {
    return "get-started";
  }
  return "components";
};

// ref: PARENT_DIR_NAME
const guideFileRegex = /.*\/pages\/([^/]+)\/([^/]+)\/index\.tsx$/;

const getRouteImporter = (guideType: GuideTypes, componentName: string) => {
  const mapGuideTypeToImporter: Record<GuideTypes, () => Promise<unknown>> = {
    "get-started":
      getStartedPageMap[`../../pages/get-started/${componentName}/index.tsx`],
    foundations:
      foundationPageMap[`../../pages/foundations/${componentName}/index.tsx`],
    components:
      componentPageMap[`../../pages/components/${componentName}/index.tsx`],
  };
  return mapGuideTypeToImporter[guideType];
};

class GuideFiles {
  readonly routes: {
    "get-started": CustomRoutes[];
    foundations: CustomRoutes[];
    components: CustomRoutes[];
  };
  readonly routeMenus: {
    foundations: SidebarMenu[];
    components: SidebarMenu[];
  };
  constructor() {
    /** Get Started **/
    const getStartedFiles = import.meta.glob(
      "../../pages/get-started/**/index.tsx"
    );
    /** Foundation **/
    const guideFoundationFiles = import.meta.glob(
      "../../pages/foundations/**/index.tsx",
      { eager: true }
    );
    /** Components **/
    const guideComponentsFiles = import.meta.glob(
      "../../pages/components/**/index.tsx",
      {
        eager: true,
      }
    );

    const tempRoutes: CustomRoutes[] = [];
    const sidebarMenus: SidebarMenu[] = [];
    const guideAllFiles = {
      ...getStartedFiles,
      ...guideFoundationFiles,
      ...guideComponentsFiles,
    };
    for (const filePath of Object.keys(guideAllFiles)) {
      try {
        const fileName = filePath.match(guideFileRegex)?.[0] || "";
        if (!fileName) continue;
        const guideType = getGuideType(fileName);
        const guideFilesDir = mapGuideTypeToDir[guideType];
        const componentName = fileName
          .split(guideFilesDir)[1]
          .split("/index.tsx")[0];

        tempRoutes.push({
          path: `/${guideType}/${componentName.toLowerCase()}`,
          Element: (guideAllFiles[filePath] as CustomRouteModule).default,
          importer: getRouteImporter(guideType, componentName),
        });
        sidebarMenus.push({
          label: componentName,
          href: `/${guideType}/${componentName.toLowerCase()}`,
        });
      } catch (err) {
        console.error(err);
        continue;
      }
    }
    const routeKeys = ["get-started", "foundations", "components"] as const;

    this.routes = tempRoutes.reduce(
      (acc, cur) => {
        const { path } = cur;
        const validRoutePath = routeKeys.find((rk) => path.includes(`/${rk}`));
        if (validRoutePath) {
          acc[validRoutePath].push(cur);
        }
        return acc;
      },
      { "get-started": [], foundations: [], components: [] } as Record<
        (typeof routeKeys)[number],
        CustomRoutes[]
      >
    );

    this.routeMenus = sidebarMenus.reduce(
      (acc, cur) => {
        const { href } = cur;
        const validHref = routeKeys.find((rk) => href.includes(`/${rk}`));
        if (validHref) {
          acc[validHref].push(cur);
        }
        return acc;
      },
      { "get-started": [], foundations: [], components: [] } as Record<
        (typeof routeKeys)[number],
        SidebarMenu[]
      >
    );
  }
  getRoutes() {
    return this.routes;
  }
  getRouteMenus() {
    return this.routeMenus;
  }
}

const guideFiles = new GuideFiles();
export const routes = guideFiles.getRoutes();
export const routeMenus = guideFiles.getRouteMenus();

const getPascalName = (name: string) => {
  const firstChar = name[0].toUpperCase();
  const restChars = name.slice(1);
  return `${firstChar}${restChars}`;
};

export const getSeoData = (
  path: string,
  type: "Component" | "Foundation" | "Get Started"
) => {
  return {
    path,
    title: `${type} | ${getPascalName(path.split("/")[2])}`,
    description: `Describe how to use ${getPascalName(path.split("/")[2])}.`,
  };
};

export const seoRoutes = [
  ...routes["get-started"].map((route) =>
    getSeoData(route.path, "Get Started")
  ),
  ...routes.foundations.map((route) => getSeoData(route.path, "Foundation")),
  ...routes.components.map((route) => getSeoData(route.path, "Component")),
];
