import { Task, Status } from './types';
import { format } from 'util';

export function print(tasks: Array<Task>) {
  if (tasks.length > 0) {
    console.log(Array(120).fill(0).map(_ => "-").join(""));

    console.log(format(
      '%s | %s | %s | %s | %s',
      "Id".padStart(10),
      "Description".padStart(30),
      "Status".padStart(10),
      "CreatedAt".padStart(25),
      "UpdatedAt".padStart(25),
    ));

    console.log(Array(120).fill(0).map(_ => "-").join(""));

    tasks.forEach(({ id, description, status, createdAt, updatedAt }) => {
      const formattedString = format(
        '%s | %s | %s | %s | %s',
        id.padStart(10),
        String(description).padStart(30),
        String(Status[status] as String).padStart(10),
        String(createdAt).padStart(25),
        String(updatedAt).padStart(25),
      );

      console.log(formattedString);
    });

    console.log(Array(120).fill(0).map(_ => "-").join(""));

  } else {
    console.log('No Tasks!')
  }
}
