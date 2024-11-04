import Command from './command';

export type CommandArgs = {
  [Command.ADD]: [string];
  [Command.UPDATE]: [number, string];
  [Command.DELETE]: [number];
  [Command.LIST]: [string?];
  [Command.MARK_DONE]: [number];
  [Command.MARK_IN_PROGRESS]: [number];
};
