import { babel } from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { dts } from "rollup-plugin-dts";
import path from "node:path";
import { writeFileSync } from "node:fs";

const getBasePkgJson = (dir) => ({
  version: "0.0.1",
  name: `@hw-rui/core/${dir}`,
  main: "./index.cjs",
  module: "./index.js",
  types: "./index.d.ts",
});

const CORE_DIRS = ["consts", "hooks", "utils"];

/**
 * @returns {import("rollup").Plugin}
 */
const createPkgJsonPlugin = (dir) => {
  return {
    name: "@hw-rui/create-package-json",
    closeBundle: () => {
      const pkgJson = getBasePkgJson(dir);
      const destPath = path.join("dist", dir, "package.json");
      writeFileSync(destPath, JSON.stringify(pkgJson));
    },
  };
};

const getBaseRollupOption = (dir) => {
  return {
    external: ["react", "react-dom"],
    input: `./src/${dir}/index.ts`,
    output: [
      {
        file: path.resolve("dist", dir, "index.js"),
        format: "esm",
        sourcemap: false,
      },
      {
        file: path.resolve("dist", dir, "index.cjs"),
        format: "cjs",
        sourcemap: false,
      },
    ],
    plugins: [
      json(),
      peerDepsExternal(),
      nodeResolve(),
      commonjs(),
      babel({
        babelHelpers: "bundled",
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        presets: ["@babel/env", "@babel/react", "@babel/preset-typescript"],
      }),
      typescript({
        tsconfig: "./tsconfig.json",
        allowImportingTsExtensions: false,
        declaration: false,
        emitDeclarationOnly: false,
      }),
      createPkgJsonPlugin(dir),
    ],
  };
};

const getBaseRollupDtsOption = (dir) => {
  return {
    input: `./src/${dir}/index.ts`,
    output: [
      {
        file: path.resolve("dist", dir, "index.d.ts"),
        format: "esm",
      },
    ],
    plugins: [dts()],
    external: [/\.css$/],
  };
};

export default [
  ...CORE_DIRS.map((dir) => getBaseRollupOption(dir)),
  ...CORE_DIRS.map((dir) => getBaseRollupDtsOption(dir)),
];
