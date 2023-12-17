// src/adapters/jsonStorageAdapter.ts
import * as fs from "fs";
import { Task } from "../entities/task";

export class JsonStorageAdapter {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private readData(): Task[] {
    try {
      const data = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(data) as Task[];
    } catch (error) {
      return [];
    }
  }

  private writeData(data: Task[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  getAllTasks(): Task[] {
    return this.readData();
  }

  getTaskById(id: string): Task | undefined {
    const tasks = this.readData();
    return tasks.find((task) => task.id === id);
  }

  saveTask(task: Task): void {
    const tasks = this.readData();
    tasks.push(task);
    this.writeData(tasks);
  }

  updateTask(task: Task): void {
    const tasks = this.readData();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      this.writeData(tasks);
    }
  }

  deleteTask(id: string): void {
    const tasks = this.readData();
    const filteredTasks = tasks.filter((t) => t.id !== id);
    this.writeData(filteredTasks);
  }
}
