import { useState } from "react";
import { PlusCircle, ArrowLeft } from "lucide-react";

type TaskCreateProps = {
  onCancel: () => void;
  onSuccess: () => void;
};

export default function TaskCreate({ onCancel, onSuccess }: TaskCreateProps) {
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, status: "incomplete" }),
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
          placeholder="Entrez le nom de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
        />
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onCancel}
          className="cursor-pointer flex items-center space-x-2 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour</span>
        </button>
        <button
          onClick={handleCreate}
          disabled={!title.trim()}
          className={`cursor-pointer flex items-center space-x-2 px-5 py-2.5 rounded-lg text-white transition-colors duration-200 shadow-md hover:shadow-lg ${
            title.trim() 
              ? 'bg-indigo-600 hover:bg-indigo-700' 
              : 'bg-indigo-300 cursor-not-allowed'
          }`}
        >
          <PlusCircle className="h-5 w-5" />
          <span>Créer</span>
        </button>
      </div>
    </div>
  );
}
