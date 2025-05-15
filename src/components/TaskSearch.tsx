"use client";

type TaskSearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function TaskSearch({ searchTerm, onSearchChange }: TaskSearchProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}
