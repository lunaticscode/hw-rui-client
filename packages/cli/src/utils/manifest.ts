import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { existsSync } from "node:fs";
import CliError from "./error";

const _filesystemErrorHandling = (err: unknown) => {
  if (err instanceof Error && "code" in err) {
    const errorCode = err.code as string;
    if (FILESYSTEM_PERMISSION_ERROR_CODES.includes(errorCode)) {
      throw new CliError("FILESYSTEM_PERMISSION_ERROR");
    }
    if (errorCode === FILESYSTEM_NOT_EXIST_ERROR_CODE) {
      throw new CliError("FILESYSTEM_NOT_EXIST_ERROR");
    }
  }
  throw new CliError("FILESYSTEM_ERROR");
};

export const MANIFEST_FILENAME = "hw-rui-manifest.json";
const LOCK_FILE_REGEX =
  /^(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb)$/;

const FILESYSTEM_OS_PERMISSION_ERROR_CODE = "EPERM";
const FILESYSTEM_USER_PERMISSION_ERROR_CODE = "EACCES";
const FILESYSTEM_PERMISSION_ERROR_CODES = [
  FILESYSTEM_OS_PERMISSION_ERROR_CODE,
  FILESYSTEM_USER_PERMISSION_ERROR_CODE,
];

const FILESYSTEM_NOT_EXIST_ERROR_CODE = "ENOENT";

export const checkExistManifest = () => {
  return existsSync(join(cwd(), MANIFEST_FILENAME));
};

// 모노레포에서는 정확한 탐지가 불가능
// shadcn cli에서는 @antfu/ni을 사용해서 탐지
export const getCurrentPacakgeManager = () => {
  try {
    const filenamesFromRoot = readdirSync(cwd());
    const onlyPackageLockFiles = filenamesFromRoot.filter((filename) =>
      LOCK_FILE_REGEX.test(filename)
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

export const existTsConfig = () => {
  try {
    return existsSync(join(cwd(), "tsconfig.json"));
  } catch (err) {
    _filesystemErrorHandling(err);
  }
};

export const writeManifestFile = (manifest: Record<string, any>) => {
  try {
    const manifestDestPath = `${join(cwd(), MANIFEST_FILENAME)}`;
    writeFileSync(manifestDestPath, JSON.stringify(manifest), {
      encoding: "utf-8",
    });
  } catch (err) {
    _filesystemErrorHandling(err);
  }
};

type ManifestInputByPrompt = {
  baseColor: string;
};

export const generateManifest = (promptInput: ManifestInputByPrompt) => {
  try {
    const { baseColor } = promptInput;
    const isExistTsconfig = existTsConfig();
    const packageManager = getCurrentPacakgeManager();

    const manifest = {
      tsx: isExistTsconfig,
      packageManager,
      baseColor,
      timestamp: new Date().getTime(),
    };

    writeManifestFile(manifest);
  } catch (err) {
    throw new CliError("UNKNOWN_ERROR");
  }
};

export const readManifestFile = () => {};
