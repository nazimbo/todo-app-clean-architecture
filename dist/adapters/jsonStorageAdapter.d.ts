import { Task } from "../entities/task";
export declare class JsonStorageAdapter {
    private filePath;
    constructor(filePath: string);
    private readData;
    private writeData;
    getAllTasks(): Task[];
    getTaskById(id: string): Task | undefined;
    saveTask(task: Task): void;
    updateTask(task: Task): void;
    deleteTask(id: string): void;
}
