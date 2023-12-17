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
export declare class UpdateTaskUseCase implements UpdateTask {
    private storageAdapter;
    constructor(storageAdapter: any);
    execute(input: UpdateTaskInput): void;
}
