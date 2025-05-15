// src/models/Task.ts
import mongoose, { Schema, models, model } from "mongoose";

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["incomplete", "complete"],
      default: "incomplete",
    },
  },
  {
    timestamps: true, // ajoute createdAt et updatedAt
  }
);

// Évite les erreurs de redéfinition de modèle si hot reload
const Task = models.Task || model("Task", TaskSchema);

export default Task;
