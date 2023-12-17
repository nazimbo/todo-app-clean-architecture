// src/app.ts
import express from "express";
import { JsonStorageAdapter } from "./adapters/jsonStorageAdapter";
import { CreateTask, CreateTaskInput, CreateTaskOutput } from "./useCases/createTask";
import { UpdateTask, UpdateTaskInput, UpdateTaskUseCase } from "./useCases/updateTask";
import { DeleteTask, DeleteTaskInput, DeleteTaskUseCase } from "./useCases/deleteTask";
import { Task } from "./entities/task";

const app = express();
const port = 3000;
const jsonStorageAdapter = new JsonStorageAdapter("tasks.json");

app.use(express.json());

const createTaskUseCase: CreateTask = {
  execute(input: CreateTaskInput): CreateTaskOutput {
    // Validate the due date format using a regular expression
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (!dateRegex.test(input.dueDate)) {
      throw new Error("Invalid due date format. Please use DD-MM-YYYY.");
    }

    // Convert the due date to a Date object to further validate it
    const [day, month, year] = input.dueDate.split("-").map(Number);
    const dueDate = new Date(year, month - 1, day);

    if (isNaN(dueDate.getTime())) {
      throw new Error("Invalid due date. Please provide a valid date.");
    }

    // Continue with task creation if date validation passes
    const task = new Task(Date.now().toString(), input.title, input.description, input.dueDate, false);
    jsonStorageAdapter.saveTask(task);
    return { task };
  },
};

app.post("/tasks", (req, res) => {
  const input: CreateTaskInput = req.body;
  const output = createTaskUseCase.execute(input);
  res.json(output.task);
});

app.get("/tasks", (req, res) => {
  const tasks = jsonStorageAdapter.getAllTasks();
  res.json(tasks);
});

const updateTaskUseCase: UpdateTask = new UpdateTaskUseCase(jsonStorageAdapter);
const deleteTaskUseCase: DeleteTask = new DeleteTaskUseCase(jsonStorageAdapter);

app.put("/tasks/:id", (req, res) => {
  const input: UpdateTaskInput = { ...req.body, id: req.params.id };
  try {
    updateTaskUseCase.execute(input);
    res.status(200).send("Task updated successfully");
  } catch (error: any) {
    res.status(404).send(error.message);
  }
});

app.delete("/tasks/:id", (req, res) => {
  const input: DeleteTaskInput = { id: req.params.id };
  try {
    deleteTaskUseCase.execute(input);
    res.status(200).send("Task deleted successfully");
  } catch (error: any) {
    res.status(404).send(error.message);
  }
});

app.use(express.static("src/interfaces"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
