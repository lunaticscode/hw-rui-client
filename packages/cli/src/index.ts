#!/usr/bin/env node
import { Command } from "commander";
import runAddCommand from "./commands/add";
import runPromptCommand from "./commands/prompt";

const program = new Command();

program
  .name("hw-rui")
  .description("CLI for manage hw-rui UI components.")
  .version("0.1.0");

program
  .command("add")
  .argument("[components...]", "Component to add")
  .description("Add a Component from hw-rui")
  .action(runAddCommand);

program
  .command("prompt")
  .description("Start prompt mode to describe and install components")
  .action(runPromptCommand);

program.parse();
