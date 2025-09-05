import { execSync } from "node:child_process";
import ora from "ora";
import prompts from "prompts";
// import fetch from "node-fetch";
import {
  checkExistManifest,
  getCurrentPacakgeManager,
} from "../utils/manifest";
import chalk from "chalk";

process.on("SIGINT", () => {
  console.log("(!) Exit process from [ctrl + c].");
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("(!) Exit process from forced terminate process.");
  process.exit(1);
});

const COMPONENT_REGISTRIES = ["components/operation-status.json"] as const;

/************ temp ************/
const installableComponents = [
  "accordion",
  "button",
  "carousel",
  "calendar",
  "popover",
  "select",
  "tabs",
  "toast",
];

const fetchHubRegistry = async (
  registryPath: (typeof COMPONENT_REGISTRIES)[number]
) => {
  /************ temp ************/
  if (registryPath === "components/operation-status.json") {
    return { installable: installableComponents };
  }
};

const runAddCommand = async () => {
  const currentPackageManager = getCurrentPacakgeManager();

  if (!checkExistManifest()) {
    console.log(
      `⚠️ ${chalk.yellowBright(chalk.bold("Manifest file does not exist. Please using the command below."))}`
    );
    console.log(`\n${chalk.greenBright("(1) npm install -g @hw-rui-cli")}`);
    console.log(`\n${chalk.greenBright("(2) hw-rui-cli init")}\n`);
    return process.exit(0);
  }

  const [operationStatus] = await Promise.all(
    COMPONENT_REGISTRIES.map((registryPath) => fetchHubRegistry(registryPath))
  );
  const { installable } = operationStatus as { installable: string[] };

  if (installable.length) {
    // select components from prompt
    const { selectedComponents = [] }: { selectedComponents: string[] } =
      await prompts({
        type: "multiselect",
        name: "selectedComponents",
        message: "Select from the installable components below.",
        hint: "Select from press Space. And submit from press Enter.",
        choices: installable.map((comp) => ({
          title: comp,
          value: `@hw-rui/${comp.toLocaleLowerCase()}`,
        })),
      });

    if (selectedComponents && selectedComponents.length) {
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
    console.log("None installable components");
  }
};

export default runAddCommand;
