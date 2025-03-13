import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import Router from "./Router.tsx";
import Layout from "./layouts/Layout.tsx";
import "./layouts/styles/index.css";
import "./i18n/index.ts";
import "@repo/theme/default.css";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Layout>
      <Router />
    </Layout>
  </BrowserRouter>
);
