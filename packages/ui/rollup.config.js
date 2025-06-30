import { babel } from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import { dts } from "rollup-plugin-dts";
import path from "node:path";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { cwd, argv, exit } from "node:process";

const OUTPUT_DIRNAME = "dist";
const INPUT_COMPNENTS_DIRNAME = "components";
const EXCLUDES_COMPONENTS = ["Popover"];

const args = argv.slice(2);
const buildTargetComponentArgs = args?.find((arg) =>
  arg.startsWith("--component")
);
const onlyBuildComponent = buildTargetComponentArgs
  ? buildTargetComponentArgs.split("--component=")[1]
  : null;

/**
 * @param {string} component
 */
const getBasePkgJson = (component) => ({
  version: "0.1.0",
  name: `@hw-rui/${component.toLowerCase()}`,
  main: "./index.cjs",
  module: "./index.js",
  types: "./index.d.ts",
  dependencies: {
    "@hw-rui/core": "^0.1.0",
  },
});

/**
 * @param {string} component
 * @returns {import("rollup").Plugin}
 */
const createPkgJsonPlugin = (component = "") => {
  if (!component.trim()) {
    return exit(1);
  }
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
 * @returns {import("rollup").InputOptions}
 */
const getBaseRollupOption = (component) => {
  if (!component.trim()) {
    return exit(1);
  }
  return {
    external: [
      "react",
      "react-dom",
      "@hw-rui/core",
      "@hw-rui/core/consts",
      "@hw-rui/core/utils",
      "@hw-rui/core/hooks",
    ],
    input: `./src/${INPUT_COMPNENTS_DIRNAME}/${component}/index.tsx`,
    output: [
      {
        file: path.resolve(OUTPUT_DIRNAME, component, "index.js"),
        format: "esm",
        sourcemap: false,
      },
      {
        file: path.resolve(OUTPUT_DIRNAME, component, "index.cjs"),
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
      createPkgJsonPlugin(component),
    ],
  };
};

const getBaseDtsRollupOption = (component) => {
  return {
    input: `./src/${INPUT_COMPNENTS_DIRNAME}/${component}/index.tsx`,
    output: [
      {
        file: path.resolve(OUTPUT_DIRNAME, component, "index.d.ts"),
        format: "esm",
      },
    ],
    plugins: [dts()],
    external: [/\.css$/],
  };
};

const getRollupOptions = () => {
  try {
    const targetDir = path.join(cwd(), "src", "components");
    const filenames = readdirSync(targetDir);
    const targetComponents = onlyBuildComponent
      ? [onlyBuildComponent]
      : filenames.filter(
          (component) =>
            statSync(path.join(targetDir, component)).isDirectory() &&
            !EXCLUDES_COMPONENTS.includes(component)
        );
    if (!targetComponents || !targetComponents.length) {
      return exit(1);
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
    exit(1);
  }
};

/**
 * @type {import("rollup").RollupOptions}
 */
export default getRollupOptions();
