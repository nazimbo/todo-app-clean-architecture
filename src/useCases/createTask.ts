// src/useCases/createTask.ts
import { Task } from "../entities/task";

export interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: string;
}

export interface CreateTaskOutput {
  task: Task;
}

export interface CreateTask {
  execute(input: CreateTaskInput): CreateTaskOutput;
}
