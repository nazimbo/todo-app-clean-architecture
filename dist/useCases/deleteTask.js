"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskUseCase = void 0;
class DeleteTaskUseCase {
    constructor(storageAdapter) {
        this.storageAdapter = storageAdapter;
    }
    execute(input) {
        const existingTask = this.storageAdapter.getTaskById(input.id);
        if (!existingTask) {
            throw new Error("Task not found");
        }
        this.storageAdapter.deleteTask(input.id);
    }
}
exports.DeleteTaskUseCase = DeleteTaskUseCase;
