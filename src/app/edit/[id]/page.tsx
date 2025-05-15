"use client";

import { useRouter, useParams } from "next/navigation";
import { Edit } from "lucide-react";
import TaskEdit from "@/components/TaskEdit";

export default function EditTaskPage() {
  const router = useRouter();
  const { id } = useParams();

  if (!id || typeof id !== "string") return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <div className="flex items-center space-x-3 mb-8">
          <Edit className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Modifier la tâche</h1>
        </div>

        <TaskEdit
          taskId={id}
          onCancel={() => router.push("/")}
          onSuccess={() => router.push("/")}
        />
      </div>
    </main>
  );
}
