"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, ListChecks } from "lucide-react";

import TaskItem from "@/components/TaskItem";
import TaskSearch from "@/components/TaskSearch";
import TaskFilter from "@/components/TaskFilter";
import TaskStats from "@/components/TaskStats";
import { TaskType } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const router = useRouter();

  const fetchTasks = async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatus = async (id: string, newStatus: "complete" | "incomplete") => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const updated = await res.json();
    setTasks(tasks.map(t => (t._id === id ? updated : t)));
  };

  const deleteTask = (id: string) => {
    router.push(`/delete/${id}`);
  };

  const goToCreate = () => {
    router.push("/createtask");
  };

  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "tous" ? true : task.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <ListChecks className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">Ma Todo List</h1>
            </div>

            <button
              onClick={goToCreate}
              className="flex items-center cursor-pointer space-x-2 px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Ajouter une tâche</span>
            </button>
          </div>

          {/* Recherche */}
          <TaskSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
  <div>
    <TaskFilter selectedStatus={statusFilter} onStatusChange={setStatusFilter} />
  </div>

  <div className="mt-4 md:mt-0">
    <TaskStats tasks={tasks} />
  </div>
</div>


          {/* Tableau */}
          <div className="overflow-x-auto">
            <table className="w-full rounded-lg overflow-hidden">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-indigo-800 uppercase tracking-wider">
                    Nom de la tâche
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-indigo-800 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-indigo-800 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                      Aucune tâche. Veuillez en ajouter une !
                    </td>
                  </tr>
                ) : filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                      {searchTerm !== ""
                        ? "Aucune tâche correspondante à votre recherche."
                        : statusFilter !== "tous"
                        ? "Aucune tâche trouvée avec ce filtre."
                        : "Aucune tâche trouvée."}
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map(task => (
                    <TaskItem
                      key={task._id}
                      task={task}
                      onDelete={deleteTask}
                      onUpdateStatus={updateTaskStatus}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
