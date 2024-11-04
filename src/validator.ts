import Command from './command';
import { CommandArgs } from './types';

const CommandArgsSchema: { [K in Command]: (args: any[]) => boolean } = {
  [Command.ADD]: (args): args is CommandArgs[Command.ADD] => typeof args[0] === 'string',
  [Command.UPDATE]: (args): args is CommandArgs[Command.UPDATE] => typeof parseInt(args[0]) === 'number' && typeof args[1] === 'string',
  [Command.DELETE]: (args): args is CommandArgs[Command.DELETE] => typeof parseInt(args[0]) === 'number',
  [Command.LIST]: (args): args is CommandArgs[Command.LIST] => args.length === 0,
  [Command.MARK_DONE]: (args): args is CommandArgs[Command.MARK_DONE] => typeof parseInt(args[0]) === 'number',
  [Command.MARK_IN_PROGRESS]: (args): args is CommandArgs[Command.MARK_IN_PROGRESS] => typeof parseInt(args[0]) === 'number'
};

const CommandParams: { [K in Command]: string[] } = {
  [Command.ADD]: ["description"],
  [Command.UPDATE]: ["id", "description"],
  [Command.DELETE]: ["id"],
  [Command.LIST]: [""],
  [Command.MARK_DONE]: ["id"],
  [Command.MARK_IN_PROGRESS]: ["id"]
};

export default function validate<K extends Command>(command: K, ...args: Array<string>): boolean {
  const isArgsValid = CommandArgsSchema[command](args);
  if (!isArgsValid) {
    const expectedParams = CommandParams[command].join(", ");
    console.error(`Invalid arguments for command ${command}: requires ${expectedParams} `);
    process.exit(1);
  }
  return isArgsValid;
}
