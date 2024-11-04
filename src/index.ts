import Command from './command';
import validateArgsFor from './validator';
import execute from './handler';
import JsonStorage from './JSONStorage';

function extractArgs(args: Array<string>) {
  return args.slice(2);
}

function isCommandValid(command: string) {
  return Object.values(Command).includes(command as Command);
}

function processArgs(args: Array<string>) {
  const command = args[0];
  if (!command || !isCommandValid(command)) {
    usage();
    process.exit(0);
  }
  args.splice(0, 1);
  if (validateArgsFor(command as Command, ...args)) {
    execute(command as Command, JsonStorage, ...args);
  }
}

function usage() {
  console.log("tk <command>\n");
  console.log("command:");
  console.log("  1. add <description>");
  console.log("  2. update <taskId> <description>");
  console.log("  3. delete <taskId>");
  console.log("  4. mark-in-progress <taskId>");
  console.log("  5. mark-done <taskId>");
  console.log("  6. list [done | todo | in-progress]");
}

function main() {
  const args = extractArgs(process.argv);
  processArgs(args)
}

main()
