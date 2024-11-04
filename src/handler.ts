import Command from './command';
import { CommandArgs } from './types';

function addTodo(description: string) {
  console.log(description)
}

function updateTodo(id: number, description: string) {
  console.log(id, description)
}

function deleteTodo(id: number) {
  console.log(id)
}

function listTodos(type?: string) {
  console.log(type)
}

function markDone(id: number) {
  console.log(id)
}

function markInProgress(id: number) {
  console.log(id)
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

export default function execute<K extends Command>(command: K, ...args: Array<string | number | undefined>): void {
  Handler[command](...args as CommandArgs[K]);
}

