"use client";

import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import TaskCreate from "@/components/TaskCreate";

export default function CreateTaskPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <div className="flex items-center space-x-3 mb-8">
          <PlusCircle className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Nouvelle tâche</h1>
        </div>

        <TaskCreate
          onCancel={() => router.push("/")}
          onSuccess={() => router.push("/")}
        />
      </div>
    </main>
  );
}
