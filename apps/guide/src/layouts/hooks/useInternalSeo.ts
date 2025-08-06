import { seoRoutes } from "@layouts/utils/getGuideFiles";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const CUSTOM_INJECTED_ID = "hw-rui";
const useSeo = () => {
  const { pathname } = useLocation();

  const cleanupInjectedTags = (tags: HTMLCollection) => {
    Array.from(tags).forEach((tag) => {
      if (tag.getAttribute("id") === CUSTOM_INJECTED_ID) {
        tag.remove();
      }
    });
  };

  const injectSeoTags = () => {
    const targetSeoData =
      seoRoutes.find((route) => route.path === pathname) ?? null;
    if (!targetSeoData) return;
    const titleTag = document.createElement("title");
    titleTag.setAttribute("id", CUSTOM_INJECTED_ID);
    titleTag.innerHTML = targetSeoData.title;
    const metaDescriptionTag = document.createElement("meta");
    metaDescriptionTag.setAttribute("id", CUSTOM_INJECTED_ID);
    metaDescriptionTag.setAttribute("name", "description");
    metaDescriptionTag.setAttribute("content", targetSeoData.description);
    document.head.prepend(titleTag, metaDescriptionTag);
  };
  const setupSeoData = () => {
    const headTags = document.head.children;
    cleanupInjectedTags(headTags);
    injectSeoTags();
  };
  useEffect(() => {
    setupSeoData();
  }, [pathname]);
};
export default useSeo;
