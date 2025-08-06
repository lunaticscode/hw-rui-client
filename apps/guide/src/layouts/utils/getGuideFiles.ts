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
type GuideTypes = "foundations" | "components";
const GUIDE_FOUNDATIONS_DIR = `/${PARENT_DIR_NAME}/foundations/`;
const GUIDE_COMPONENTS_DIR = `/${PARENT_DIR_NAME}/components/`;
export const foundationPageMap = import.meta.glob(
  "../../pages/foundations/**/index.tsx"
);
export const componentPageMap = import.meta.glob(
  "../../pages/components/**/index.tsx"
);

const mapGuideTypeToDir: { [key in GuideTypes]: string } = {
  foundations: GUIDE_FOUNDATIONS_DIR,
  components: GUIDE_COMPONENTS_DIR,
};

const getGuideType = (fileName: string): GuideTypes => {
  if (fileName.includes(GUIDE_COMPONENTS_DIR)) {
    return "components";
  }
  if (fileName.includes(GUIDE_FOUNDATIONS_DIR)) {
    return "foundations";
  }
  return "components";
};

// ref: PARENT_DIR_NAME
const guideFileRegex = /.*\/pages\/([^/]+)\/([^/]+)\/index\.tsx$/;

class GuideFiles {
  readonly routes: { foundations: CustomRoutes[]; components: CustomRoutes[] };
  readonly routeMenus: {
    foundations: SidebarMenu[];
    components: SidebarMenu[];
  };
  constructor() {
    // ref: PARENT_DIR_NAME

    const guideFoundationFiles = import.meta.glob(
      "../../pages/foundations/**/index.tsx",
      { eager: true }
    );
    // ref: PARENT_DIR_NAME
    const guideComponentsFiles = import.meta.glob(
      "../../pages/components/**/index.tsx",
      {
        eager: true,
      }
    );

    const tempRoutes: CustomRoutes[] = [];
    const sidebarMenus: SidebarMenu[] = [];
    const guideAllFiles = { ...guideFoundationFiles, ...guideComponentsFiles };
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
          importer:
            guideType === "components"
              ? componentPageMap[
                  `../../pages/components/${componentName}/index.tsx`
                ]
              : foundationPageMap[
                  `../../pages/foundations/${componentName}/index.tsx`
                ],
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
    this.routes = {
      foundations: tempRoutes.filter(({ path }) =>
        path.includes("/foundations")
      ),
      components: tempRoutes.filter(({ path }) => path.includes("/components")),
    };
    this.routeMenus = {
      foundations: sidebarMenus.filter(({ href }) =>
        href.includes("/foundations")
      ),
      components: sidebarMenus.filter(({ href }) =>
        href.includes("/components")
      ),
    };
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

export const getSeoData = (path: string, type: "Component" | "Foundation") => {
  return {
    path,
    title: `${type} | ${getPascalName(path.split("/")[2])}`,
    description: `Describe how to use ${getPascalName(path.split("/")[2])}.`,
  };
};

export const seoRoutes = [
  ...routes.foundations.map((route) => getSeoData(route.path, "Foundation")),
  ...routes.components.map((route) => getSeoData(route.path, "Component")),
];
