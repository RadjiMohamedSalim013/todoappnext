import { useState, useEffect } from "react";
import { TaskType } from "@/types/task";
import { Save, X } from "lucide-react";

type TaskEditProps = {
  taskId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

export default function TaskEdit({ taskId, onCancel, onSuccess }: TaskEditProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"complete" | "incomplete">("incomplete");

  useEffect(() => {
    fetch(`/api/tasks/${taskId}`)
      .then((res) => res.json())
      .then((data: TaskType) => {
        setTitle(data.title);
        setStatus(data.status);
      });
  }, [taskId]);

  const handleUpdate = async () => {
    await fetch(`/api/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status }),
    });
    onSuccess();
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nom de la tâche
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entrez le nom de la tâche"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Statut
        </label>
        <select
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          value={status}
          onChange={(e) => setStatus(e.target.value as "complete" | "incomplete")}
        >
          <option value="incomplete">En cours</option>
          <option value="complete">Terminé</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          onClick={onCancel}
          className="cursor-pointer flex items-center space-x-2 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          <X className="h-5 w-5" />
          <span>Annuler</span>
        </button>
        <button
          onClick={handleUpdate}
          className="cursor-pointer flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Save className="h-5 w-5" />
          <span>Enregistrer</span>
        </button>
      </div>
    </div>
  );
}
