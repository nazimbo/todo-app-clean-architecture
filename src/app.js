"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const jsonStorageAdapter_1 = require("./adapters/jsonStorageAdapter");
const task_1 = require("./entities/task");
const app = (0, express_1.default)();
const port = 3000;
const jsonStorageAdapter = new jsonStorageAdapter_1.JsonStorageAdapter("tasks.json");
app.use(express_1.default.json());
const createTaskUseCase = {
    execute(input) {
        const task = new task_1.Task(Date.now().toString(), input.title, input.description, input.dueDate, false);
        jsonStorageAdapter.saveTask(task);
        return { task };
    },
};
app.post("/tasks", (req, res) => {
    const input = req.body;
    const output = createTaskUseCase.execute(input);
    res.json(output.task);
});
app.get("/tasks", (req, res) => {
    const tasks = jsonStorageAdapter.getAllTasks();
    res.json(tasks);
});
app.use(express_1.default.static("src/interfaces"));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
