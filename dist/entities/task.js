"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
// src/entities/task.ts
class Task {
    constructor(id, title, description, dueDate, completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}
exports.Task = Task;
