"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const jsonStorageAdapter_1 = require("./adapters/jsonStorageAdapter");
const updateTask_1 = require("./useCases/updateTask");
const deleteTask_1 = require("./useCases/deleteTask");
const task_1 = require("./entities/task");
const app = (0, express_1.default)();
const port = 3000;
const jsonStorageAdapter = new jsonStorageAdapter_1.JsonStorageAdapter("tasks.json");
app.use(express_1.default.json());
const createTaskUseCase = {
    execute(input) {
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (!dateRegex.test(input.dueDate)) {
            throw new Error("Invalid due date format. Please use DD-MM-YYYY.");
        }
        const [day, month, year] = input.dueDate.split("-").map(Number);
        const dueDate = new Date(year, month - 1, day);
        if (isNaN(dueDate.getTime())) {
            throw new Error("Invalid due date. Please provide a valid date.");
        }
        const task = new task_1.Task(Date.now().toString(), input.title, input.description, input.dueDate, false);
        jsonStorageAdapter.saveTask(task);
        return { task };
    },
};
app.post("/tasks", (req, res) => {
    const input = req.body;
    try {
        const output = createTaskUseCase.execute(input);
        res.json(output.task);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
app.get("/tasks", (req, res) => {
    const tasks = jsonStorageAdapter.getAllTasks();
    res.json(tasks);
});
const updateTaskUseCase = new updateTask_1.UpdateTaskUseCase(jsonStorageAdapter);
const deleteTaskUseCase = new deleteTask_1.DeleteTaskUseCase(jsonStorageAdapter);
app.put("/tasks/:id", (req, res) => {
    const input = Object.assign(Object.assign({}, req.body), { id: req.params.id });
    try {
        updateTaskUseCase.execute(input);
        res.status(200).send("Task updated successfully");
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
app.delete("/tasks/:id", (req, res) => {
    const input = { id: req.params.id };
    try {
        deleteTaskUseCase.execute(input);
        res.status(200).send("Task deleted successfully");
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
app.use(express_1.default.static("src/interfaces"));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
