import { CheckCircle, Clock, List } from "lucide-react";

type TaskStatsProps = {
  tasks: { status: "complete" | "incomplete" }[];
};

export default function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "complete").length;
  const incompleteTasks = tasks.filter(t => t.status === "incomplete").length;

  return (
    <div className="flex flex-col space-y-3 text-base text-gray-800">
      <div className="flex items-center space-x-3">
        <List className="w-5 h-5 text-indigo-600" />
        <span className="font-medium">Nombre total de tâches : <strong>{totalTasks}</strong></span>
      </div>
      <div className="flex items-center space-x-3">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="font-medium">Tâches terminées : <strong>{completedTasks}</strong></span>
      </div>
      <div className="flex items-center space-x-3">
        <Clock className="w-5 h-5 text-yellow-600" />
        <span className="font-medium">Tâches en cours : <strong>{incompleteTasks}</strong></span>
      </div>
    </div>
  );
}
