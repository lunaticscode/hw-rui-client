import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { cwd } from "node:process";
import ora from "ora";
import prompts from "prompts";

process.on("SIGINT", () => {
  console.log("(!) Exit process from [ctrl + c].");
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("(!) Exit process from forced terminate process.");
  process.exit(1);
});

const getCurrentPacakgeManager = () => {
  try {
    const filenamesFromRoot = readdirSync(cwd());
    const lockFileRegex =
      /^(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb)$/;
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
    console.error(err);
    return "npm";
  }
};

const runAddCommand = async (components: string[]) => {
  const activeComponents: string[] = [];
  const installableComponents: string[] = components.filter((comp: string) =>
    activeComponents.includes(comp)
  );

  if (!installableComponents || !installableComponents.length) {
    // select components from prompt
    const { selectedComponents = [] }: { selectedComponents: string[] } =
      await prompts({
        type: "multiselect",
        name: "selectedComponents",
        message: "Select from the installable components below.",
        hint: "Select from press Space. And submit from press Enter.",
        choices: activeComponents.map((comp) => ({
          title: comp,
          value: `@hw-rui/${comp.toLocaleLowerCase()}`,
        })),
      });

    if (selectedComponents && selectedComponents.length) {
      const currentPackageManager = getCurrentPacakgeManager();

      for (const componentPackageName of selectedComponents) {
        const installCli = `${currentPackageManager} add ${componentPackageName}`;
        const spinner = ora({
          text: `Installing ${componentPackageName} .....`,
          spinner: "arrow3",
        });
        spinner.start();
        execSync(installCli);
        spinner.text = `Installed ${componentPackageName}.`;
        spinner.succeed();
      }
    }
  } else {
  }
};

export default runAddCommand;
