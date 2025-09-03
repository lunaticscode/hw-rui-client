import { execSync } from "node:child_process";
import ora from "ora";
import prompts from "prompts";
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

  const installableComponents = ["accordion", "button"];

  if (installableComponents.length) {
    // select components from prompt
    const { selectedComponents = [] }: { selectedComponents: string[] } =
      await prompts({
        type: "multiselect",
        name: "selectedComponents",
        message: "Select from the installable components below.",
        hint: "Select from press Space. And submit from press Enter.",
        choices: installableComponents.map((comp) => ({
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
