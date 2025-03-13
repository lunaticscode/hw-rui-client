import { Route, Routes } from "react-router-dom";
import NotPoundPage from "./layouts/NotFoundPage";
import { routes } from "@layouts/utils/getGuideFiles";

const Router = () => {
  return (
    <Routes>
      <Route path={"/"} element={<h2>Main</h2>} />
      <Route path={"/foundations"} element={<h2>Foundations</h2>} />
      {routes?.foundations?.map(({ path, Element }, index) => (
        <Route
          key={`route-foundation-key-${index}`}
          path={path}
          element={<Element />}
        />
      ))}
      <Route path={"/components"} element={<h2>Components</h2>} />
      {routes?.components?.map(({ path, Element }, index) => (
        <Route
          key={`route-component-key-${index}`}
          path={path}
          element={<Element />}
        />
      ))}
      <Route path={"*"} element={<NotPoundPage />} />
    </Routes>
  );
};
export default Router;
