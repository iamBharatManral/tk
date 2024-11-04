import { Task, Status, TaskStorage } from './types';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const outputFile = "tasks.json";

export const JSONStorage: TaskStorage & { storage: { tasks: Array<Task> }, writeToFile: () => void } = {
  storage: {
    tasks: (function() {
      if (existsSync(outputFile)) {
        const { tasks } = JSON.parse(readFileSync(outputFile, 'utf8'));
        return tasks;
      }
      return [];
    })()
  },

  add(task: Task): void {
    this.storage.tasks.push(task);
    this.writeToFile();
  },

  update(id: string, description: string): void {
    const task = this.storage.tasks.find((task: Task) => task.id === id);
    if (!task) {
      console.error(`No task found with id ${id}`);
      return;
    }
    const remainingTasks = this.storage.tasks.filter((task: Task) => task.id !== id);
    task.description = description;
    this.storage.tasks = [task, ...remainingTasks];
    this.writeToFile();
  },

  delete(id: string): void {
    this.storage.tasks = this.storage.tasks.filter((task: Task) => task.id !== id);
    this.writeToFile();
  },

  mark(id: string, progress: Status): void {
    const task = this.storage.tasks.find((task: Task) => task.id === id);
    if (!task) {
      console.error(`No task found with id ${id}`);
      return;
    }
    const remainingTasks = this.storage.tasks.filter((task: Task) => task.id !== id);
    task.status = progress;
    this.storage.tasks = [task, ...remainingTasks];
    this.writeToFile();
  },

  listAll(): Array<Task> { return this.storage.tasks; },

  listByStatus(status: Status): Array<Task> {
    return this.storage.tasks.filter((task: Task) => task.status === status)
  },

  writeToFile() {
    writeFileSync(outputFile, JSON.stringify(this.storage))
  }
}

export default JSONStorage;
