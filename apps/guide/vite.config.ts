import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import seoPlugin from "./plugins/seo";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    seoPlugin(),
    {
      name: "markdown-loader",
      transform(code, id) {
        if (id.slice(-3) === ".md") {
          return `export default ${JSON.stringify(code)};`;
        }
      },
    },
  ],
  resolve: {
    alias: [
      {
        find: "@layouts",
        replacement: path.resolve(__dirname, "src/layouts"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils"),
      },
    ],
  },
});
