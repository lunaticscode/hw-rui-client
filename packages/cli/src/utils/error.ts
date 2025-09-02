import chalk from "chalk";

type ErrorCodes = "UNKNOWN_ERROR" | "FAIL_TO_CONNECT_HUB_API";

const DEFAULT_ERROR_MESSAGE = "Occured unknown-error, exit process...";
const ERROR_CODES: Record<ErrorCodes, { message: string }> = {
  UNKNOWN_ERROR: {
    message: DEFAULT_ERROR_MESSAGE,
  },
  FAIL_TO_CONNECT_HUB_API: {
    message: "Failed to connect hw-rui-hub api, Please try again later.",
  },
};

const ERROR_NAME = "CliError";

class CliError extends Error {
  constructor(errorCode: ErrorCodes, from?: string) {
    super();
    const errorMessage =
      ERROR_CODES[errorCode].message ?? DEFAULT_ERROR_MESSAGE;
    this.name = ERROR_NAME;
    console.error(
      `\n❌ ${chalk.redBright(chalk.bold("Error"))}\n${chalk.redBright("[message]")}: ${chalk.red(errorMessage)}\n${chalk.redBright("[from]")}: ${from ?? this.stack}`
    );
    process.exit(1);
  }
}

export default CliError;
