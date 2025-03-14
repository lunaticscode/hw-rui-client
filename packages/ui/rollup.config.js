import { babel } from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { dts } from "rollup-plugin-dts";
import path from "node:path";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { cwd } from "node:process";

const OUTPUT_DIRNAME = "dist";
const INPUT_COMPNENTS_DIRNAME = "components";

/**
 * @param {string} component
 */
const getBasePkgJson = (component = "") => ({
  version: "0.0.1",
  name: `@hw-rui/${component.toLowerCase()}`,
  main: "./index.cjs",
  module: "./index.js",
  types: "./types/index.d.ts",
  //   dependencies: {
  //     "@hw-rui/core": "^0.1.0",
  //   },
});

/**
 * @param {string} component
 * @returns {import("rollup").Plugin}
 */
const createPkgJsonPlugin = (component) => {
  return {
    name: "@hw-rui/create-package-json",
    closeBundle: () => {
      const pkgJson = getBasePkgJson(component);
      const destPath = path.join(
        cwd(),
        OUTPUT_DIRNAME,
        component,
        "package.json"
      );
      writeFileSync(destPath, JSON.stringify(pkgJson));
    },
  };
};

/**
 * @param {string} component
 * @returns {import("rollup").RollupOptions}
 */
const getBaseRollupOption = (component) => {
  return {
    external: [
      "react",
      "react-dom",
      "@repo/core",
      "@repo/core/consts",
      "@repo/core/utils",
      "@repo/core/hooks",
    ],
    input: `./src/${INPUT_COMPNENTS_DIRNAME}/${component}/index.tsx`, // 진입점
    output: [
      {
        file: `${OUTPUT_DIRNAME}/${component}/index.js`,
        format: "esm", // esmodule로 output
        sourcemap: false,
      },
      {
        file: `${OUTPUT_DIRNAME}/${component}/index.cjs`,
        format: "cjs", // esmodule로 output
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
      }),
      createPkgJsonPlugin(component),
    ],
  };
};

const getBaseDtsRollupOption = (component) => {
  return {
    input: `./src/${INPUT_COMPNENTS_DIRNAME}/${component}/index.tsx`,
    output: [
      { file: `./${OUTPUT_DIRNAME}/${component}/index.d.ts`, format: "esm" },
    ],
    plugins: [dts({ tsconfig: "./tsconfig.json" })],
    external: [/\.css$/],
  };
};

const getRollupOptions = () => {
  try {
    const targetDir = path.join(cwd(), "src", "components");
    const filenames = readdirSync(targetDir);
    const targetComponents = filenames.filter((filename) =>
      statSync(path.join(targetDir, filename)).isDirectory()
    );
    if (!targetComponents || !targetComponents.length) {
      return process.exit(1);
    }
    const jsRollupOptions = targetComponents.map((component) =>
      getBaseRollupOption(component)
    );
    const dtsRollupOptions = targetComponents.map((component) =>
      getBaseDtsRollupOption(component)
    );
    return [...jsRollupOptions, ...dtsRollupOptions];
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

/**
 * @type {import("rollup").RollupOptions}
 */
export default getRollupOptions();
