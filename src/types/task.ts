// src/types/task.ts
export interface TaskType {
  _id: string;
  title: string;
  status: "complete" | "incomplete";
  createdAt: string;
  updatedAt: string;
}
