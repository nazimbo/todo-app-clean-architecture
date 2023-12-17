// src/entities/task.ts
export class Task {
  constructor(public id: string, public title: string, public description: string, public dueDate: string, public completed: boolean) {}
}
