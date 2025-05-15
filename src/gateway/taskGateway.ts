// src/gateway/taskGateway.ts
import Task from "@/models/Task";
import mongoose from "mongoose";


// Créer une tâche
export const creerTache = async (title: string) => {
  const nouvelleTache = await Task.create({ title });
  return nouvelleTache;
};

// Lire toutes les tâches
export const lireToutesLesTaches = async () => {
  return await Task.find().sort({ createdAt: -1 });
};



// Lire une tâche par ID
export const lireTacheParId = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Task.findById(id);
};

// Modifier une tâche par ID
export const modifierTache = async (
  id: string,
  data: { title?: string; status?: "complete" | "incomplete" }
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Task.findByIdAndUpdate(id, data, { new: true });
};

// Supprimer une tâche par ID
export const supprimerTache = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Task.findByIdAndDelete(id);
};
