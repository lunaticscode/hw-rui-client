import fetch from "node-fetch";
import { Command } from "commander";
import prompts from "prompts";
import { cwd } from "node:process";
import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import ora from "ora";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://hw-lab.site"
    : "http://localhost:8002";

const componentsStatusUrl = `${baseUrl}/api/components/status`;

interface ComponentData {
  packageName: string;
}

interface ComponentStatus {
  active: string[];
  status: Record<string, ComponentData>;
}

process.on("SIGINT", () => {
  console.log("(!)Exit process from [ctrl + c].");
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("(!)Exit process from forced terminate process.");
  process.exit(1);
});

//* [::TODO] move to utils
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

const exec = async () => {
  const requestComponentsJson = await fetch(componentsStatusUrl);
  let activeComponents: ComponentStatus["active"] | undefined;
  if (requestComponentsJson.ok) {
    const response = (await requestComponentsJson.json()) as {
      data: ComponentStatus;
    };

    activeComponents = response.data.active;
  } else {
    console.error(
      "(!)Cannot load components.json from `" + componentsStatusUrl + "`"
    );
    process.exit(1);
  }

  if (!activeComponents || (activeComponents && !activeComponents.length)) {
    console.log("Sorry, There are currently no installable components.");
    process.exit(0);
  }

  const addCommand = new Command()
    .name("add")
    .description("add components to your project")
    .argument("[components...]", "install components")
    .action(async (components, _options) => {
      const installableComponents: string[] = components.filter(
        (comp: string) => activeComponents.includes(comp)
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
    });

  addCommand.parse();
};

exec();
