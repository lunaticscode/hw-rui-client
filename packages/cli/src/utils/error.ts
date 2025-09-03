import chalk from "chalk";

type ErrorCodes =
  | "UNKNOWN_ERROR"
  | "FAIL_TO_CONNECT_HUB_API"
  | "FILESYSTEM_PERMISSION_ERROR"
  | "FILESYSTEM_NOT_EXIST_ERROR"
  | "FILESYSTEM_ERROR";

const DEFAULT_ERROR_MESSAGE = "Occured unknown-error, exit process...";
const ERROR_CODES: Record<ErrorCodes, { message: string }> = {
  UNKNOWN_ERROR: {
    message: DEFAULT_ERROR_MESSAGE,
  },
  FAIL_TO_CONNECT_HUB_API: {
    message: "Failed to connect hw-rui-hub api, Please try again later.",
  },
  FILESYSTEM_ERROR: {
    message:
      "A file system error has occurred. Please check the file path, availability, or disk status.",
  },
  FILESYSTEM_PERMISSION_ERROR: {
    message:
      "Permission denied while accessing the file system. Please check your user privileges or file permissions.",
  },
  FILESYSTEM_NOT_EXIST_ERROR: {
    message: "Not exist file. Please check the file path.",
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
