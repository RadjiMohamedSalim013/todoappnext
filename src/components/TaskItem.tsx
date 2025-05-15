"use client";

import { TaskType } from "@/types/task";
import { useRouter } from "next/navigation";
import { Edit, Trash2, RefreshCw } from "lucide-react";

type TaskItemProps = {
  task: TaskType;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, newStatus: "complete" | "incomplete") => void;
};

export default function TaskItem({ task, onDelete, onUpdateStatus }: TaskItemProps) {
  const router = useRouter();

  const toggleStatus = () => {
    const newStatus = task.status === "complete" ? "incomplete" : "complete";
    onUpdateStatus(task._id, newStatus);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-indigo-50 transition-colors duration-150 ">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm font-medium text-gray-900">
          {task.title}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          task.status === "complete" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {task.status === "complete" ? "Terminé" : "En cours"}
        </span>
      </td>

      <td className="px-6 py-4  whitespace-nowrap text-right text-sm font-medium space-x-2">
        <button
          onClick={() => router.push(`/edit/${task._id}`)}
          className="cursor-pointer text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition-colors flex items-center space-x-1"
          title="Modifier"
        >
          <Edit className="h-4 w-4" />
          <span>Modifier</span>
        </button>
        
        <button
          onClick={() => onDelete(task._id)}
          className="cursor-pointer text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors flex items-center space-x-1"
          title="Supprimer"
        >
          <Trash2 className="h-4 w-4" />
          <span>Supprimer</span>
        </button>
        
        <button
          onClick={toggleStatus}
          className={`cursor-pointer p-2 rounded-full transition-colors flex items-center space-x-1 ${
            task.status === "complete"
              ? "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100"
              : "text-green-600 hover:text-green-800 hover:bg-green-100"
          }`}
          title={task.status === "complete" ? "Marquer en cours" : "Marquer comme terminé"}
        >
          <RefreshCw className="h-4 w-4" />
          <span>{task.status === "complete" ? "Marquer en cours" : "Marquer comme terminé"}</span>
        </button>
      </td>
    </tr>
  );
}
