"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";

export default function DeleteTaskPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  if (!id) return <p className="p-4 text-red-500">ID de la tâche manquant.</p>;

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    setLoading(false);
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/");
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <>
      {/* Fond sombre avec animation */}
      <div
        onClick={handleCancel}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300"
      ></div>

      {/* Modal centré avec animation */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md animate-in fade-in-90 zoom-in-90"
          onClick={(e) => e.stopPropagation()}
        >
          {/* En-tête */}
          <div className="bg-red-50 p-5 flex items-start space-x-3">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Confirmer la suppression</h2>
              <p className="text-sm text-gray-600 mt-1">Cette action est irréversible</p>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer définitivement cette tâche ?
            </p>

            {/* Boutons */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <X className="h-5 w-5" />
                <span>Annuler</span>
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:hover:bg-red-600"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Suppression...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-5 w-5" />
                    <span>Supprimer</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}