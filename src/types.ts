import Command from './command';

export type CommandArgs = {
  [Command.ADD]: [TaskStorage, string];
  [Command.UPDATE]: [TaskStorage, string, string];
  [Command.DELETE]: [TaskStorage, string];
  [Command.LIST]: [TaskStorage, string?];
  [Command.MARK_DONE]: [TaskStorage, string];
  [Command.MARK_IN_PROGRESS]: [TaskStorage, string];
};

export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

export type Task = {
  id: string,
  description: string,
  status: Status,
  createdAt: Date,
  updatedAt: Date
}

export interface TaskStorage {
  add: (task: Task) => void
  update: (id: string, description: string) => void
  delete: (id: string) => void
  mark: (id: string, progress: Status) => void
  listAll: () => Array<Task>
  listByStatus: (status: Status) => Array<Task>
}
