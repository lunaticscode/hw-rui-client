import { ComponentType, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NotPoundPage from "./layouts/NotFoundPage";
import { routes } from "@layouts/utils/getGuideFiles";
import Layout from "@layouts/Layout";
import { Suspense } from "react";

const Router = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Page Loading....</div>}>
        <Routes>
          <Route path={"/"} element={<h2>Main</h2>} />
          <Route path={"/foundations"} element={<h2>Foundations</h2>} />

          {routes?.["get-started"]?.map(({ path, importer }, index) => {
            let componentName = path.split("get-started/")[1];
            componentName =
              componentName[0].toUpperCase() + componentName.slice(1);
            const LazyElement = lazy(
              importer as () => Promise<{ default: ComponentType }>
            );
            return (
              <Route
                key={`route-get_started-key-${index}`}
                path={path}
                element={<LazyElement />}
              />
            );
          })}
          {routes?.foundations?.map(({ path, importer }, index) => {
            let componentName = path.split("foundations/")[1];
            componentName =
              componentName[0].toUpperCase() + componentName.slice(1);
            const LazyElement = lazy(
              importer as () => Promise<{ default: ComponentType }>
            );
            return (
              <Route
                key={`route-foundation-key-${index}`}
                path={path}
                element={<LazyElement />}
              />
            );
          })}
          <Route path={"/components"} element={<h2>Components</h2>} />
          {routes?.components?.map(({ path, importer }, index) => {
            let componentName = path.split("components/")[1];
            componentName =
              componentName[0].toUpperCase() + componentName.slice(1);
            const LazyElement = lazy(
              importer as () => Promise<{ default: ComponentType }>
            );
            return (
              <Route
                key={`route-component-key-${index}`}
                path={path}
                element={<LazyElement />}
              />
            );
          })}
          <Route path={"*"} element={<NotPoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};
export default Router;
