import { babel } from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import path from "node:path";
import { writeFileSync } from "node:fs";

const getBasePkgJson = () => ({
  version: "0.1.7",
  name: `@hw-rui/cli`,
  main: "./index.cjs",
  bin: {
    "hw-rui": "./index.cjs",
  },
  type: "commonjs",
  license: "MIT",
});

const createPkgJsonPlugin = () => {
  return {
    name: "@hw-rui/create-package-json",
    closeBundle: () => {
      const pkgJson = getBasePkgJson();
      const destPath = path.join("dist", "package.json");
      writeFileSync(destPath, JSON.stringify(pkgJson, null, 2));
    },
  };
};

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.cjs",
    format: "cjs",
    inlineDynamicImports: true,
  },
  external: [],
  plugins: [
    json(),
    nodeResolve({
      extensions: [".js", ".ts"],
      preferBuiltins: false,
      mainFields: ["module", "main"],
      exportConditions: ["node"],
    }),
    commonjs({
      include: /node_modules/,
      requireReturnsDefault: "auto",
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".ts"],
      presets: [
        ["@babel/preset-env", { targets: { node: "16" } }],
        "@babel/preset-typescript",
      ],
    }),
    createPkgJsonPlugin(),
    terser(),
  ],
};
