#!/usr/bin/env node
import { Command } from "commander";
import { runAddCommand, runInitCommand, runPromptCommand } from "./commands";

const program = new Command();

program
  .name("hw-rui")
  .description("CLI for manage hw-rui UI components.")
  .version("0.1.7");

program
  .command("init")
  .description("Initialize our hw-rui system for helping your proejct.")
  .action(runInitCommand);

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
