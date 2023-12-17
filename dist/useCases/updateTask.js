"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskUseCase = void 0;
class UpdateTaskUseCase {
    constructor(storageAdapter) {
        this.storageAdapter = storageAdapter;
    }
    execute(input) {
        const existingTask = this.storageAdapter.getTaskById(input.id);
        if (!existingTask) {
            throw new Error("Task not found");
        }
        const updatedTask = Object.assign(Object.assign({}, existingTask), { title: input.title, description: input.description, dueDate: input.dueDate, completed: input.completed });
        this.storageAdapter.updateTask(updatedTask);
    }
}
exports.UpdateTaskUseCase = UpdateTaskUseCase;
