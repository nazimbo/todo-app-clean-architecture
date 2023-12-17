// src/useCases/getTask.ts
import { Task } from "../entities/task";

export interface GetTasksOutput {
  tasks: Task[];
}

export interface GetTasks {
  execute(): GetTasksOutput;
}
