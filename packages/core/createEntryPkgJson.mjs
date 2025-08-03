import { join } from "node:path";
import { writeFileSync } from "node:fs";
const pkgJsonTemplate = {
  name: "@hw-rui/core",
  version: "0.1.5",
  license: "MIT",
  exports: {
    "./consts": {
      import: "./consts/index.js",
      require: "./consts/index.cjs",
      types: "./consts/index.d.ts",
    },
    "./hooks": {
      import: "./hooks/index.js",
      require: "./hooks/index.cjs",
      types: "./hooks/index.d.ts",
    },
    "./utils": {
      import: "./utils/index.js",
      require: "./utils/index.cjs",
      types: "./utils/index.d.ts",
    },
  },
};

const createEntryPkgJsonFile = () => {
  try {
    writeFileSync(
      join("dist", "package.json"),
      JSON.stringify(pkgJsonTemplate)
    );
  } catch (err) {
    console.err(err);
  }
};

createEntryPkgJsonFile();
