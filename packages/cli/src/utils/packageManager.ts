import { readdirSync } from "node:fs";

import { cwd } from "node:process";

const lockFileRegex =
  /^(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb)$/;

export const getCurrentPacakgeManager = () => {
  try {
    const filenamesFromRoot = readdirSync(cwd());
    const onlyPackageLockFiles = filenamesFromRoot.filter((filename) =>
      lockFileRegex.test(filename)
    );
    if (onlyPackageLockFiles && onlyPackageLockFiles[0]) {
      const lockFile = onlyPackageLockFiles[0];
      if (lockFile.includes("pnpm")) return "pnpm";
      if (lockFile.includes("package-lock")) return "npm";
      if (lockFile.includes("yarn")) return "yarn";
      return "npm";
    }
    return "npm";
  } catch (err) {
    return "npm";
  }
};
