export interface DeleteTaskInput {
    id: string;
}
export interface DeleteTask {
    execute(input: DeleteTaskInput): void;
}
export declare class DeleteTaskUseCase implements DeleteTask {
    private storageAdapter;
    constructor(storageAdapter: any);
    execute(input: DeleteTaskInput): void;
}
