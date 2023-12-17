"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonStorageAdapter = void 0;
// src/adapters/jsonStorageAdapter.ts
const fs = __importStar(require("fs"));
class JsonStorageAdapter {
    constructor(filePath) {
        this.filePath = filePath;
    }
    readData() {
        try {
            const data = fs.readFileSync(this.filePath, "utf-8");
            return JSON.parse(data);
        }
        catch (error) {
            return [];
        }
    }
    writeData(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
    }
    getAllTasks() {
        return this.readData();
    }
    getTaskById(id) {
        const tasks = this.readData();
        return tasks.find((task) => task.id === id);
    }
    saveTask(task) {
        const tasks = this.readData();
        tasks.push(task);
        this.writeData(tasks);
    }
    updateTask(task) {
        const tasks = this.readData();
        const index = tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
            tasks[index] = task;
            this.writeData(tasks);
        }
    }
    deleteTask(id) {
        const tasks = this.readData();
        const filteredTasks = tasks.filter((t) => t.id !== id);
        this.writeData(filteredTasks);
    }
}
exports.JsonStorageAdapter = JsonStorageAdapter;
