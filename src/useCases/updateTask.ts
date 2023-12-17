// src/useCases/updateTask.ts
import { Task } from "../entities/task";

export interface UpdateTaskInput {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export interface UpdateTask {
  execute(input: UpdateTaskInput): void;
}

export class UpdateTaskUseCase implements UpdateTask {
  constructor(private storageAdapter: any) {}

  execute(input: UpdateTaskInput): void {
    const existingTask = this.storageAdapter.getTaskById(input.id);

    if (!existingTask) {
      throw new Error("Task not found");
    }

    const updatedTask: Task = {
      ...existingTask,
      title: input.title,
      description: input.description,
      dueDate: input.dueDate,
      completed: input.completed,
    };

    this.storageAdapter.updateTask(updatedTask);
  }
}
