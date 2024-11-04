import Command from './command';
import { CommandArgs, Task, Status, TaskStorage } from './types';
import { generateId } from './utils';
import { print } from './printer';

export function addTodo(storage: TaskStorage, description: string): void {
  storage.add({
    id: generateId(),
    description,
    status: Status.TODO,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Task);
}

function updateTodo(storage: TaskStorage, id: string, description: string): void {
  storage.update(id, description);
}

function deleteTodo(storage: TaskStorage, id: string): void {
  storage.delete(id);
}

function listTodos(storage: TaskStorage, status?: string): void {
  if (!status) {
    print(storage.listAll());
    return;
  }
  if (status == "done") {
    print(storage.listByStatus(Status.DONE));
    return;
  }
  if (status == "todo") {
    print(storage.listByStatus(Status.TODO));
    return;
  }
  if (status == "in-progress") {
    print(storage.listByStatus(Status.IN_PROGRESS));
    return;
  }
  throw new Error(`Invalid progress status: ${status}`);
}

function markDone(storage: TaskStorage, id: string): void {
  storage.mark(id, Status.DONE);
}

function markInProgress(storage: TaskStorage, id: string) {
  storage.mark(id, Status.IN_PROGRESS);
}

const Handler: {
  [K in Command]: (...args: CommandArgs[K]) => void
} = {
  [Command.ADD]: addTodo,
  [Command.UPDATE]: updateTodo,
  [Command.DELETE]: deleteTodo,
  [Command.LIST]: listTodos,
  [Command.MARK_DONE]: markDone,
  [Command.MARK_IN_PROGRESS]: markInProgress
}

export default function execute<K extends Command>(command: K, storage: TaskStorage, ...args: Array<string | number | undefined>): void {
  const augmentedArgs: CommandArgs[K] = [storage, ...args] as CommandArgs[K];
  Handler[command](...augmentedArgs);
}

