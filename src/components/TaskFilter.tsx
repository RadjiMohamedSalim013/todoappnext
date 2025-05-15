type TaskFilterProps = {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
};

export default function TaskFilter({ selectedStatus, onStatusChange }: TaskFilterProps) {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-semibold text-gray-700">Filtrer par statut :</label>
      <div className="flex space-x-3">
        {["tous", "incomplete", "complete"].map(status => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              selectedStatus === status
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            aria-pressed={selectedStatus === status}
          >
            {status === "tous" ? "Tous" : status === "complete" ? "Terminé" : "En cours"}
          </button>
        ))}
      </div>
    </div>
  );
}
