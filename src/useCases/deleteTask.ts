// src/useCases/deleteTask.ts
export interface DeleteTaskInput {
  id: string;
}

export interface DeleteTask {
  execute(input: DeleteTaskInput): void;
}

export class DeleteTaskUseCase implements DeleteTask {
  constructor(private storageAdapter: any) {}

  execute(input: DeleteTaskInput): void {
    const existingTask = this.storageAdapter.getTaskById(input.id);

    if (!existingTask) {
      throw new Error("Task not found");
    }

    this.storageAdapter.deleteTask(input.id);
  }
}
