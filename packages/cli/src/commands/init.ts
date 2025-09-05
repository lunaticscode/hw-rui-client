import chalk from "chalk";
import ora from "ora";
import fetch from "node-fetch";
import prompts from "prompts";
import { HUB_BASE_REGISTRY_URL } from "../consts";
import CliError from "../utils/error";
import {
  checkExistManifest,
  generateManifest,
  MANIFEST_FILENAME,
} from "../utils/manifest";

process.on("SIGINT", () => {
  console.log("(!) Exit process from [ctrl + c].");
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("(!) Exit process from forced terminate process.");
  process.exit(1);
});

const FOUNDATION_REGISTRIES = ["foundations/base-color.json"] as const;

const fetchHubRegistry = async (
  registryPath: (typeof FOUNDATION_REGISTRIES)[number]
) => {
  try {
    const request = await fetch(`${HUB_BASE_REGISTRY_URL}/${registryPath}`);
    if (request.ok) {
      const response = await request.json();
      return response;
    }
  } catch (err) {
    throw new CliError("FAIL_TO_CONNECT_HUB_API");
  }
};

const getFoundationManifest = async () => {
  try {
    const [baseColor] = await Promise.all(
      FOUNDATION_REGISTRIES.map((registry) => fetchHubRegistry(registry))
    );
    if (!baseColor) {
      return null;
    }
    return {
      baseColor,
    };
  } catch (err) {
    throw err;
  }
};

const runInitCommand = async () => {
  try {
    if (checkExistManifest()) {
      console.log(
        `${chalk.yellowBright(chalk.bold("⚠️ Already initialized..!"))}`
      );
      process.exit(0);
    }

    console.log(
      `🚀 ${chalk.greenBright(chalk.bold("Statrt initialize hw-rui-cli..."))}`
    );

    const spinner = ora({
      text: `Get foundation-manifest from hw-rui-hub...`,
      spinner: "arrow3",
    });
    spinner.start();
    const foundations = await getFoundationManifest();
    if (!foundations) {
      throw new CliError("FAIL_TO_CONNECT_HUB_API");
    }
    const { baseColor } = foundations as {
      /** temp typing **/
      baseColor: Record<string, Record<string, string>>;
    };

    spinner.stop();
    spinner.text = `Succes to fetch foundation-manifest.`;
    spinner.succeed();

    console.log(
      "\n",
      "You can check base-color in below url.",
      "\n",
      "[url] https://rui.hw-lab.site/foundations/color\n"
    );

    const { selectedBaseColor = "ash" }: { selectedBaseColor: string } =
      await prompts({
        type: "select",
        name: "selectedBaseColor",
        message: `Select from the usable base color.\n`,
        hint: "Select from press Space. And submit from press Enter.",
        choices: Object.keys(baseColor).map((baseColorKey) => ({
          title: baseColorKey.toUpperCase(),
          value: baseColorKey,
        })),
      });
    generateManifest({ baseColor: selectedBaseColor });
    console.log(
      `\n✅ ${chalk.greenBright(chalk.bold(`Success to initialize :) Check the manifest file.\n\n> ${MANIFEST_FILENAME}\n`))}`
    );
  } catch (err) {
    throw err;
  }
};
export default runInitCommand;
